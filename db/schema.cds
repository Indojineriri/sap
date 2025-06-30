namespace allocation_system;

entity Customers {
  key customerId: String; // cust-001 などの形式
  name: String;
  email: String;
}

entity Products {
  key productId: String; // prod-001 などの形式
  name: String;
  description: String;
  price: Decimal(10,2);
}

entity Orders {
  key orderId: String; // order-001 などの形式
  orderNumber: String;
  orderDate: Date;
  requestedDate: Date;
  businessImpact: String;
  urgencyReason: String;
  negotiationRoom: String;
  customer: Association to Customers;
  createdAt: Timestamp;
  createdBy: String;
  modifiedAt: Timestamp;
  modifiedBy: String;
  aiComment: String;
}

entity OrderItems {
  key itemId: String; // item-001 などの形式
  quantity: Integer;
  ordersorderId: Association to Orders;
  productproductId: Association to Products;
}

entity Inventory {
  key inventoryId: String;
  productproductId: Association to Products;
  location: String;
  stock: Integer;
}

entity AllocationDifficultCases {
  key caseId: String;
  order: Association to Orders;
  issueDescription: String;
  status: String;
}

entity AIRecommendations {
  key recommendationId: String;
  caseId: Association to Orders;
  recommendationText: String;
}
