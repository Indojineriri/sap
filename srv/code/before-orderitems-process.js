/**
 * Automatically update the related Inventory when an OrderItem is processed, ensuring availableStock does not go below minimumKeepLevel.
 * @Before(event = { "PROCESS" }, entity = "reception_autoSrv.OrderItems")
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
 */
module.exports = async function(request) {
    const { Inventory, OrderItems } = cds.entities;

    // Extract the OrderItem details from the request
    const { ID, requestedQty } = request.data;

    if (!ID || requestedQty === undefined) return;

    // Fetch the OrderItem to get the associated Order and Inventory
    const orderItem = await SELECT.one.from(OrderItems).where({ ID });

    if (!orderItem || !orderItem.orders_ID) return;

    // Fetch the associated Inventory based on the Order's Inventory ID
    const inventory = await SELECT.one.from(Inventory).where({ ID: orderItem.orders_ID });

    if (!inventory) return;

    // Calculate the new available stock
    const newAvailableStock = inventory.availableStock - requestedQty;

    // Ensure the available stock does not go below the minimum keep level
    if (newAvailableStock >= inventory.minimumKeepLevel) {
        // Update the Inventory's available stock
        await UPDATE(Inventory).set({ availableStock: newAvailableStock }).where({ ID: inventory.ID });
    } else {
        // Optionally, you can handle the case where the stock would go below the minimum keep level
        // For example, you might throw an error or log a warning
        console.warn(`Cannot process OrderItem ${ID}: Available stock would go below minimum keep level.`);
    }
}
