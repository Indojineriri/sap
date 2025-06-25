using { Reception_auto as my } from '../db/schema.cds';

@path: '/service/reception_auto'
@requires: 'authenticated-user'
service reception_autoSrv {
  @odata.draft.enabled
  entity Products as projection on my.Products;
  @odata.draft.enabled
  entity Customers as projection on my.Customers;
  @odata.draft.enabled
  entity Inventory as projection on my.Inventory;
  @odata.draft.enabled
  entity Orders as projection on my.Orders;
  @odata.draft.enabled
  entity OrderItems as projection on my.OrderItems;
  @odata.draft.enabled
  entity AllocationDifficultCases as projection on my.AllocationDifficultCases;
  @odata.draft.enabled
  entity AIRecommendations as projection on my.AIRecommendations;
  @odata.draft.enabled
  entity HumanDecisions as projection on my.HumanDecisions;
}