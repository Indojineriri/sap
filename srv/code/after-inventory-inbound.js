/**
 * Automatically add expectedInbound quantity to currentStock when expectedInbound quantity arrives.
 * @After(event = { "INBOUND" }, entity = "reception_autoSrv.Inventory")
 * @param {(Object|Object[])} results - For the After phase only: the results of the event processing
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
 */
module.exports = async function(results, request) {
  const { Inventory } = cds.entities;

  // Ensure results is an array for consistent processing
  if (!Array.isArray(results)) {
    results = [results];
  }

  for (const result of results) {
    if (result.expectedInbound && result.inboundDate) {
      const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

      if (result.inboundDate === today) {
        // Calculate new currentStock
        const newCurrentStock = (result.currentStock || 0) + result.expectedInbound;

        // Update the currentStock in the database
        await UPDATE(Inventory)
          .set({ currentStock: newCurrentStock, expectedInbound: 0 }) // Reset expectedInbound after addition
          .where({ ID: result.ID });
      }
    }
  }
}
