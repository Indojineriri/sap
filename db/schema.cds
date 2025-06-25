namespace Reception_auto;

using
{
    cuid,
    Currency
}
from '@sap/cds/common';

entity Products : cuid
{
    productCode : String(50)
        @mandatory;
    productName : String(100);
    category : String(50);
    unitPrice : Decimal(10,2);
    Currency : Currency;
    leadTimeDays : Integer;
    strategicImportance : String(50);
    substitutionComplexity : String(50);
    // 1対多の関係に変更：一つの製品が複数倉庫にある
    inventory : Association to many Inventory on inventory.product = $self;
}

annotate Products with @assert.unique :
{
    productCode : [ productCode ],
};

entity Customers : cuid
{
    customerCode : String(50)
        @mandatory;
    customerName : String(100);
    priorityLevel : Integer;
    flexibilityLevel : String(50);
    relationshipValue : Decimal(10,2);
    Currency : Currency;
    orders : Association to many Orders on orders.customers = $self;
}

annotate Customers with @assert.unique :
{
    customerCode : [ customerCode ],
};

entity Inventory : cuid
{
    warehouse : String(100)
        @mandatory;
    currentStock : Decimal(10,2);
    allocatedStock : Decimal(10,2);
    availableStock : Decimal(10,2);
    expectedInbound : Decimal(10,2);
    inboundDate : Date;
    minimumKeepLevel : Decimal(10,2);
    
    // 製品との関連を追加
    product : Association to one Products;
}

// 倉庫×製品の組み合わせで一意制約に変更
annotate Inventory with @assert.unique :
{
    warehouseProduct : [ warehouse, product ],
};

entity Orders : cuid
{
    orderNumber : String(50)
        @mandatory;
    orderDate : Date;
    requestedDate : Date;
    businessImpact : String(50);
    urgencyReason : String(50);
    negotiationRoom : String(50);
    orderItems : Association to many OrderItems on orderItems.orders = $self;
    allocationDifficultCases : Association to many AllocationDifficultCases on allocationDifficultCases.orders = $self;
    customers : Association to one Customers;
}

annotate Orders with @assert.unique :
{
    orderNumber : [ orderNumber ],
};

entity OrderItems : cuid
{
    requestedQty : Decimal(10,2);
    partialOK : Boolean;
    substituteOK : Boolean;
    dateFlexible : Boolean;
    maxDelayDays : Integer;
    orders : Association to one Orders;
    product : Association to one Products;  // 製品との関連を追加
}

entity AllocationDifficultCases : cuid
{
    caseDate : DateTime;
    difficultyType : String(50);
    shortageItems : String(100);
    availableOptions : String(100);
    caseStatus : String(50);
    assignedTo : String(50);
    aiAnalysisRequested : Boolean;
    aiRecommendations : Association to many AIRecommendations on aiRecommendations.allocationDifficultCases = $self;
    humanDecisions : Association to many HumanDecisions on humanDecisions.allocationDifficultCases = $self;
    orders : Association to one Orders;
}

entity AIRecommendations : cuid
{
    analysisDate : DateTime;
    recommendationType : String(50);
    confidence : Decimal(5,2);
    reasoning : String(200);
    recommendedSolution : String(100);
    estimatedImpact : String(100);
    aiModel : String(50);
    processingTime : Integer;
    dataQuality : Decimal(5,2);
    allocationDifficultCases : Association to one AllocationDifficultCases;
}

entity HumanDecisions : cuid
{
    decisionDate : DateTime;
    decidedBy : String(50);
    finalDecision : String(100);
    actualSolution : String(100);
    decisionReason : String(200);
    agreementLevel : String(50);
    implementationStatus : String(50);
    actualOutcome : String(100);
    satisfactionScore : Integer;
    allocationDifficultCases : Association to one AllocationDifficultCases;
}

entity Entity1
{
    key ID : UUID;
}

// サービス定義（変更なし）
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