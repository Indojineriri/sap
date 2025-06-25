/**
 * Implement validation to ensure requestedQty in OrderItems does not exceed availableStock plus expectedInbound unless substituteOK is true.
 * @Before(event = { "VALIDATE" }, entity = "reception_autoSrv.OrderItems")
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
 */
module.exports = async function(request) {
  const { Inventory } = cds.entities;
  const { requestedQty, substituteOK, orders_ID } = request.data;

  if (requestedQty === undefined || orders_ID === undefined) return;

  // Fetch the related order to get the associated product's inventory
  const order = await SELECT.one.from('reception_autoSrv.Orders').where({ ID: orders_ID });

  if (!order || !order.customers_ID) return;

  // Fetch the inventory associated with the product
  const inventory = await SELECT.one.from(Inventory).where({ ID: order.customers_ID });

  if (!inventory) return;

  const { availableStock, expectedInbound } = inventory;

  // Validate requestedQty against availableStock + expectedInbound unless substituteOK is true
  if (!substituteOK && requestedQty > availableStock + expectedInbound) {
    return request.error(400, 'Requested quantity exceeds available stock and expected inbound.');
  }
}
