/**
 * The custom logic attached to the Orders entity to reduce inventory based on ordered quantities before an order is created. If inventory is insufficient, it automatically creates an AllocationDifficultCase.
 * @Before(event = { "CREATE" }, entity = "allocation_systemSrv.Orders")
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
 */
module.exports = async function (request) {
  const { OrderItems, Inventory, AllocationDifficultCases } = cds.entities;

  // Retrieve the order items associated with the order being created
  const orderItems = await SELECT.from(OrderItems).where({ ordersorderId_ID: request.data.ID });

  for (const item of orderItems) {
    // Retrieve the current inventory for the product
    const inventory = await SELECT.one.from(Inventory).where({ productproductId_ID: item.productproductId_ID });

    if (inventory && inventory.availableStock >= item.quantity) {
      // Reduce the inventory by the ordered quantity
      inventory.availableStock -= item.quantity;
      await UPDATE(Inventory).set({ availableStock: inventory.availableStock }).where({ inventoryId: inventory.inventoryId });
    } else {
      // If inventory is insufficient, create an AllocationDifficultCase
      const shortageItems = `Product ID: ${item.productproductId_ID}, Ordered Quantity: ${item.quantity}, Available Stock: ${inventory ? inventory.availableStock : 0}`;
      await INSERT.into(AllocationDifficultCases).columns(
        'caseDate', 'difficultyType', 'shortageItems', 'availableOptions', 'caseStatus', 'assignedTo', 'aiAnalysisRequested'
      ).values(
        new Date(), 'Inventory Shortage', shortageItems, 'Review Options', 'Open', 'Unassigned', false
      );
    }
  }
};
