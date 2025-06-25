/**
 * Automatically calculate availableStock as currentStock minus allocatedStock for all inventory items.
 * @After(event = { "UPDATE" }, entity = "reception_autoSrv.Inventory")
 * @param {(Object|Object[])} results - For the After phase only: the results of the event processing
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
 */
module.exports = async function(results, request) {
    const { Inventory } = cds.entities;

    // Ensure results is an array for consistent processing
    if (!Array.isArray(results)) {
        results = [results];
    }

    // Iterate over each inventory item in the results
    for (const inventoryItem of results) {
        if (inventoryItem.currentStock !== undefined && inventoryItem.allocatedStock !== undefined) {
            // Calculate availableStock
            inventoryItem.availableStock = inventoryItem.currentStock - inventoryItem.allocatedStock;

            // Update the Inventory entity with the new availableStock value
            await UPDATE(Inventory).set({ availableStock: inventoryItem.availableStock }).where({ ID: inventoryItem.ID });
        }
    }
};
