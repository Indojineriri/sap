using { allocation_system as my } from '../db/schema';

service allocation_systemSrv {
  entity Customers as projection on my.Customers;
  entity Products as projection on my.Products;
  entity Orders as projection on my.Orders;
  entity OrderItems as projection on my.OrderItems;
  entity Inventory as projection on my.Inventory;
  entity AllocationDifficultCases as projection on my.AllocationDifficultCases;
  entity AIRecommendations as projection on my.AIRecommendations;

  // ⬇️ analyzeOrder アクションをここに定義！
  action analyzeOrder(orderId: UUID, input: String) returns String;
}
