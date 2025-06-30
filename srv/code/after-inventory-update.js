/**
 * The custom logic attached to the Inventory entity to perform calculations after an inventory update event, ensuring that inventory levels are correctly reflected after an order is processed.
 * @After(event = { "UPDATE" }, entity = "allocation_systemSrv.Inventory")
 * @param {(Object|Object[])} results - For the After phase only: the results of the event processing
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
 */
module.exports = async function(results, request) {
    const { OrderItems, Inventory } = cds.entities;

    // Ensure results is an array for consistent processing
    if (!Array.isArray(results)) {
        results = [results];
    }

    for (const result of results) {
        if (!result || !result.productproductId_ID) continue;

        // Fetch all order items related to the updated inventory product
        const orderItems = await SELECT.from(OrderItems).where({ productproductId_ID: result.productproductId_ID });

        if (orderItems.length > 0) {
            // Calculate the total quantity ordered for the product
            const totalOrderedQuantity = orderItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

            // Update the available stock in the inventory
            const updatedAvailableStock = result.availableStock - totalOrderedQuantity;

            // Ensure the updated available stock is not negative
            const newAvailableStock = Math.max(updatedAvailableStock, 0);

            // Update the inventory record with the new available stock
            await UPDATE(Inventory).set({ availableStock: newAvailableStock }).where({ inventoryId: result.inventoryId });
        }
    }
}
