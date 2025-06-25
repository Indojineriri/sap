using { reception_autoSrv } from '../srv/service.cds';

annotate reception_autoSrv.Products with @UI.HeaderInfo: { TypeName: 'Product', TypeNamePlural: 'Products', Title: { Value: productCode } };
annotate reception_autoSrv.Products with {
  ID @UI.Hidden @Common.Text: { $value: productCode, ![@UI.TextArrangement]: #TextOnly }
};
annotate reception_autoSrv.Products with @UI.Identification: [{ Value: productCode }];
annotate reception_autoSrv.Products with {
  inventory @Common.ValueList: {
    CollectionPath: 'Inventory',
    Parameters    : [
      {
        $Type            : 'Common.ValueListParameterInOut',
        LocalDataProperty: inventory_ID, 
        ValueListProperty: 'ID'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'warehouse'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'currentStock'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'allocatedStock'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'availableStock'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'expectedInbound'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'inboundDate'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'minimumKeepLevel'
      },
    ],
  }
};
annotate reception_autoSrv.Products with {
  productCode @title: 'Product Code';
  productName @title: 'Product Name';
  category @title: 'Category';
  unitPrice @title: 'Unit Price';
  leadTimeDays @title: 'Lead Time Days';
  strategicImportance @title: 'Strategic Importance';
  substitutionComplexity @title: 'Substitution Complexity'
};

annotate reception_autoSrv.Products with {
  unitPrice @Measures.ISOCurrency: Currency_code
};

annotate reception_autoSrv.Products with @UI.LineItem: [
 { $Type: 'UI.DataField', Value: productCode },
 { $Type: 'UI.DataField', Value: productName },
 { $Type: 'UI.DataField', Value: category },
 { $Type: 'UI.DataField', Value: unitPrice },
 { $Type: 'UI.DataField', Value: leadTimeDays },
 { $Type: 'UI.DataField', Value: strategicImportance },
 { $Type: 'UI.DataField', Value: substitutionComplexity },
    { $Type: 'UI.DataField', Label: 'Inventory', Value: inventory_ID }
];

annotate reception_autoSrv.Products with @UI.FieldGroup #Main: {
  $Type: 'UI.FieldGroupType', Data: [
 { $Type: 'UI.DataField', Value: productCode },
 { $Type: 'UI.DataField', Value: productName },
 { $Type: 'UI.DataField', Value: category },
 { $Type: 'UI.DataField', Value: unitPrice },
 { $Type: 'UI.DataField', Value: leadTimeDays },
 { $Type: 'UI.DataField', Value: strategicImportance },
 { $Type: 'UI.DataField', Value: substitutionComplexity },
    { $Type: 'UI.DataField', Label: 'Inventory', Value: inventory_ID }
  ]
};

annotate reception_autoSrv.Products with {
  inventory @Common.Text: { $value: inventory.warehouse, ![@UI.TextArrangement]: #TextOnly }
};

annotate reception_autoSrv.Products with {
  inventory @Common.Label: 'Inventory'
};

annotate reception_autoSrv.Products with @UI.Facets: [
  { $Type: 'UI.ReferenceFacet', ID: 'Main', Label: 'General Information', Target: '@UI.FieldGroup#Main' }
];

annotate reception_autoSrv.Products with @UI.SelectionFields: [
  inventory_ID
];

annotate reception_autoSrv.Customers with @UI.HeaderInfo: { TypeName: 'Customer', TypeNamePlural: 'Customers', Title: { Value: customerCode } };
annotate reception_autoSrv.Customers with {
  ID @UI.Hidden @Common.Text: { $value: customerCode, ![@UI.TextArrangement]: #TextOnly }
};
annotate reception_autoSrv.Customers with @UI.Identification: [{ Value: customerCode }];
annotate reception_autoSrv.Customers with {
  customerCode @title: 'Customer Code';
  customerName @title: 'Customer Name';
  priorityLevel @title: 'Priority Level';
  flexibilityLevel @title: 'Flexibility Level';
  relationshipValue @title: 'Relationship Value'
};

annotate reception_autoSrv.Customers with {
  relationshipValue @Measures.ISOCurrency: Currency_code
};

annotate reception_autoSrv.Customers with @UI.LineItem: [
 { $Type: 'UI.DataField', Value: customerCode },
 { $Type: 'UI.DataField', Value: customerName },
 { $Type: 'UI.DataField', Value: priorityLevel },
 { $Type: 'UI.DataField', Value: flexibilityLevel },
 { $Type: 'UI.DataField', Value: relationshipValue }
];

annotate reception_autoSrv.Customers with @UI.FieldGroup #Main: {
  $Type: 'UI.FieldGroupType', Data: [
 { $Type: 'UI.DataField', Value: customerCode },
 { $Type: 'UI.DataField', Value: customerName },
 { $Type: 'UI.DataField', Value: priorityLevel },
 { $Type: 'UI.DataField', Value: flexibilityLevel },
 { $Type: 'UI.DataField', Value: relationshipValue }
  ]
};

annotate reception_autoSrv.Customers with {
  orders @Common.Label: 'Orders'
};

annotate reception_autoSrv.Customers with @UI.Facets: [
  { $Type: 'UI.ReferenceFacet', ID: 'Main', Label: 'General Information', Target: '@UI.FieldGroup#Main' }
];

annotate reception_autoSrv.Customers with @UI.SelectionFields: [
  customerCode
];

annotate reception_autoSrv.Inventory with @UI.HeaderInfo: { TypeName: 'Inventory', TypeNamePlural: 'Inventories', Title: { Value: warehouse } };
annotate reception_autoSrv.Inventory with {
  ID @UI.Hidden @Common.Text: { $value: warehouse, ![@UI.TextArrangement]: #TextOnly }
};
annotate reception_autoSrv.Inventory with @UI.Identification: [{ Value: warehouse }];
annotate reception_autoSrv.Inventory with {
  warehouse @title: 'Warehouse';
  currentStock @title: 'Current Stock';
  allocatedStock @title: 'Allocated Stock';
  availableStock @title: 'Available Stock';
  expectedInbound @title: 'Expected Inbound';
  inboundDate @title: 'Inbound Date';
  minimumKeepLevel @title: 'Minimum Keep Level'
};

annotate reception_autoSrv.Inventory with @UI.LineItem: [
 { $Type: 'UI.DataField', Value: warehouse },
 { $Type: 'UI.DataField', Value: currentStock },
 { $Type: 'UI.DataField', Value: allocatedStock },
 { $Type: 'UI.DataField', Value: availableStock },
 { $Type: 'UI.DataField', Value: expectedInbound },
 { $Type: 'UI.DataField', Value: inboundDate },
 { $Type: 'UI.DataField', Value: minimumKeepLevel }
];

annotate reception_autoSrv.Inventory with @UI.FieldGroup #Main: {
  $Type: 'UI.FieldGroupType', Data: [
 { $Type: 'UI.DataField', Value: warehouse },
 { $Type: 'UI.DataField', Value: currentStock },
 { $Type: 'UI.DataField', Value: allocatedStock },
 { $Type: 'UI.DataField', Value: availableStock },
 { $Type: 'UI.DataField', Value: expectedInbound },
 { $Type: 'UI.DataField', Value: inboundDate },
 { $Type: 'UI.DataField', Value: minimumKeepLevel }
  ]
};

annotate reception_autoSrv.Inventory with @UI.Facets: [
  { $Type: 'UI.ReferenceFacet', ID: 'Main', Label: 'General Information', Target: '@UI.FieldGroup#Main' }
];

annotate reception_autoSrv.Inventory with @UI.SelectionFields: [
  warehouse
];

annotate reception_autoSrv.Orders with @UI.HeaderInfo: { TypeName: 'Order', TypeNamePlural: 'Orders', Title: { Value: orderNumber } };
annotate reception_autoSrv.Orders with {
  ID @UI.Hidden @Common.Text: { $value: orderNumber, ![@UI.TextArrangement]: #TextOnly }
};
annotate reception_autoSrv.Orders with @UI.Identification: [{ Value: orderNumber }];
annotate reception_autoSrv.Orders with {
  customers @Common.ValueList: {
    CollectionPath: 'Customers',
    Parameters    : [
      {
        $Type            : 'Common.ValueListParameterInOut',
        LocalDataProperty: customers_ID, 
        ValueListProperty: 'ID'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'customerCode'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'customerName'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'priorityLevel'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'flexibilityLevel'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'relationshipValue'
      },
    ],
  }
};
annotate reception_autoSrv.Orders with {
  orderNumber @title: 'Order Number';
  orderDate @title: 'Order Date';
  requestedDate @title: 'Requested Date';
  businessImpact @title: 'Business Impact';
  urgencyReason @title: 'Urgency Reason';
  negotiationRoom @title: 'Negotiation Room'
};

annotate reception_autoSrv.Orders with @UI.LineItem: [
 { $Type: 'UI.DataField', Value: orderNumber },
 { $Type: 'UI.DataField', Value: orderDate },
 { $Type: 'UI.DataField', Value: requestedDate },
 { $Type: 'UI.DataField', Value: businessImpact },
 { $Type: 'UI.DataField', Value: urgencyReason },
 { $Type: 'UI.DataField', Value: negotiationRoom },
    { $Type: 'UI.DataField', Label: 'Customer', Value: customers_ID }
];

annotate reception_autoSrv.Orders with @UI.FieldGroup #Main: {
  $Type: 'UI.FieldGroupType', Data: [
 { $Type: 'UI.DataField', Value: orderNumber },
 { $Type: 'UI.DataField', Value: orderDate },
 { $Type: 'UI.DataField', Value: requestedDate },
 { $Type: 'UI.DataField', Value: businessImpact },
 { $Type: 'UI.DataField', Value: urgencyReason },
 { $Type: 'UI.DataField', Value: negotiationRoom },
    { $Type: 'UI.DataField', Label: 'Customer', Value: customers_ID }
  ]
};

annotate reception_autoSrv.Orders with {
  customers @Common.Text: { $value: customers.customerCode, ![@UI.TextArrangement]: #TextOnly }
};

annotate reception_autoSrv.Orders with {
  orderItems @Common.Label: 'Order Items';
  allocationDifficultCases @Common.Label: 'Allocation Difficult Cases';
  customers @Common.Label: 'Customer'
};

annotate reception_autoSrv.Orders with @UI.Facets: [
  { $Type: 'UI.ReferenceFacet', ID: 'Main', Label: 'General Information', Target: '@UI.FieldGroup#Main' }
];

annotate reception_autoSrv.Orders with @UI.SelectionFields: [
  customers_ID
];

annotate reception_autoSrv.OrderItems with @UI.HeaderInfo: { TypeName: 'Order Item', TypeNamePlural: 'Order Items' };
annotate reception_autoSrv.OrderItems with {
  orders @Common.ValueList: {
    CollectionPath: 'Orders',
    Parameters    : [
      {
        $Type            : 'Common.ValueListParameterInOut',
        LocalDataProperty: orders_ID, 
        ValueListProperty: 'ID'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'orderNumber'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'orderDate'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'requestedDate'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'businessImpact'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'urgencyReason'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'negotiationRoom'
      },
    ],
  }
};
annotate reception_autoSrv.OrderItems with {
  requestedQty @title: 'Requested Quantity';
  partialOK @title: 'Partial OK';
  substituteOK @title: 'Substitute OK';
  dateFlexible @title: 'Date Flexible';
  maxDelayDays @title: 'Max Delay Days'
};

annotate reception_autoSrv.OrderItems with @UI.LineItem: [
 { $Type: 'UI.DataField', Value: requestedQty },
 { $Type: 'UI.DataField', Value: partialOK },
 { $Type: 'UI.DataField', Value: substituteOK },
 { $Type: 'UI.DataField', Value: dateFlexible },
 { $Type: 'UI.DataField', Value: maxDelayDays },
    { $Type: 'UI.DataField', Label: 'Order', Value: orders_ID }
];

annotate reception_autoSrv.OrderItems with @UI.FieldGroup #Main: {
  $Type: 'UI.FieldGroupType', Data: [
 { $Type: 'UI.DataField', Value: requestedQty },
 { $Type: 'UI.DataField', Value: partialOK },
 { $Type: 'UI.DataField', Value: substituteOK },
 { $Type: 'UI.DataField', Value: dateFlexible },
 { $Type: 'UI.DataField', Value: maxDelayDays },
    { $Type: 'UI.DataField', Label: 'Order', Value: orders_ID }
  ]
};

annotate reception_autoSrv.OrderItems with {
  orders @Common.Text: { $value: orders.orderNumber, ![@UI.TextArrangement]: #TextOnly }
};

annotate reception_autoSrv.OrderItems with {
  orders @Common.Label: 'Order'
};

annotate reception_autoSrv.OrderItems with @UI.Facets: [
  { $Type: 'UI.ReferenceFacet', ID: 'Main', Label: 'General Information', Target: '@UI.FieldGroup#Main' }
];

annotate reception_autoSrv.OrderItems with @UI.SelectionFields: [
  orders_ID
];

annotate reception_autoSrv.AllocationDifficultCases with @UI.HeaderInfo: { TypeName: 'Allocation Difficult Case', TypeNamePlural: 'Allocation Difficult Cases' };
annotate reception_autoSrv.AllocationDifficultCases with {
  orders @Common.ValueList: {
    CollectionPath: 'Orders',
    Parameters    : [
      {
        $Type            : 'Common.ValueListParameterInOut',
        LocalDataProperty: orders_ID, 
        ValueListProperty: 'ID'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'orderNumber'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'orderDate'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'requestedDate'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'businessImpact'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'urgencyReason'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'negotiationRoom'
      },
    ],
  }
};
annotate reception_autoSrv.AllocationDifficultCases with {
  caseDate @title: 'Case Date';
  difficultyType @title: 'Difficulty Type';
  shortageItems @title: 'Shortage Items';
  availableOptions @title: 'Available Options';
  caseStatus @title: 'Case Status';
  assignedTo @title: 'Assigned To';
  aiAnalysisRequested @title: 'AI Analysis Requested'
};

annotate reception_autoSrv.AllocationDifficultCases with @UI.LineItem: [
 { $Type: 'UI.DataField', Value: caseDate },
 { $Type: 'UI.DataField', Value: difficultyType },
 { $Type: 'UI.DataField', Value: shortageItems },
 { $Type: 'UI.DataField', Value: availableOptions },
 { $Type: 'UI.DataField', Value: caseStatus },
 { $Type: 'UI.DataField', Value: assignedTo },
 { $Type: 'UI.DataField', Value: aiAnalysisRequested },
    { $Type: 'UI.DataField', Label: 'Order', Value: orders_ID }
];

annotate reception_autoSrv.AllocationDifficultCases with @UI.FieldGroup #Main: {
  $Type: 'UI.FieldGroupType', Data: [
 { $Type: 'UI.DataField', Value: caseDate },
 { $Type: 'UI.DataField', Value: difficultyType },
 { $Type: 'UI.DataField', Value: shortageItems },
 { $Type: 'UI.DataField', Value: availableOptions },
 { $Type: 'UI.DataField', Value: caseStatus },
 { $Type: 'UI.DataField', Value: assignedTo },
 { $Type: 'UI.DataField', Value: aiAnalysisRequested },
    { $Type: 'UI.DataField', Label: 'Order', Value: orders_ID }
  ]
};

annotate reception_autoSrv.AllocationDifficultCases with {
  orders @Common.Text: { $value: orders.orderNumber, ![@UI.TextArrangement]: #TextOnly }
};

annotate reception_autoSrv.AllocationDifficultCases with {
  aiRecommendations @Common.Label: 'AI Recommendations';
  humanDecisions @Common.Label: 'Human Decisions';
  orders @Common.Label: 'Order'
};

annotate reception_autoSrv.AllocationDifficultCases with @UI.Facets: [
  { $Type: 'UI.ReferenceFacet', ID: 'Main', Label: 'General Information', Target: '@UI.FieldGroup#Main' }
];

annotate reception_autoSrv.AllocationDifficultCases with @UI.SelectionFields: [
  orders_ID
];

annotate reception_autoSrv.AIRecommendations with @UI.HeaderInfo: { TypeName: 'AI Recommendation', TypeNamePlural: 'AI Recommendations' };
annotate reception_autoSrv.AIRecommendations with {
  allocationDifficultCases @Common.ValueList: {
    CollectionPath: 'AllocationDifficultCases',
    Parameters    : [
      {
        $Type            : 'Common.ValueListParameterInOut',
        LocalDataProperty: allocationDifficultCases_ID, 
        ValueListProperty: 'ID'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'caseDate'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'difficultyType'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'shortageItems'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'availableOptions'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'caseStatus'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'assignedTo'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'aiAnalysisRequested'
      },
    ],
  }
};
annotate reception_autoSrv.AIRecommendations with {
  analysisDate @title: 'Analysis Date';
  recommendationType @title: 'Recommendation Type';
  confidence @title: 'Confidence';
  reasoning @title: 'Reasoning';
  recommendedSolution @title: 'Recommended Solution';
  estimatedImpact @title: 'Estimated Impact';
  aiModel @title: 'AI Model';
  processingTime @title: 'Processing Time';
  dataQuality @title: 'Data Quality'
};

annotate reception_autoSrv.AIRecommendations with @UI.LineItem: [
 { $Type: 'UI.DataField', Value: analysisDate },
 { $Type: 'UI.DataField', Value: recommendationType },
 { $Type: 'UI.DataField', Value: confidence },
 { $Type: 'UI.DataField', Value: reasoning },
 { $Type: 'UI.DataField', Value: recommendedSolution },
 { $Type: 'UI.DataField', Value: estimatedImpact },
 { $Type: 'UI.DataField', Value: aiModel },
 { $Type: 'UI.DataField', Value: processingTime },
 { $Type: 'UI.DataField', Value: dataQuality },
    { $Type: 'UI.DataField', Label: 'Allocation Difficult Case', Value: allocationDifficultCases_ID }
];

annotate reception_autoSrv.AIRecommendations with @UI.FieldGroup #Main: {
  $Type: 'UI.FieldGroupType', Data: [
 { $Type: 'UI.DataField', Value: analysisDate },
 { $Type: 'UI.DataField', Value: recommendationType },
 { $Type: 'UI.DataField', Value: confidence },
 { $Type: 'UI.DataField', Value: reasoning },
 { $Type: 'UI.DataField', Value: recommendedSolution },
 { $Type: 'UI.DataField', Value: estimatedImpact },
 { $Type: 'UI.DataField', Value: aiModel },
 { $Type: 'UI.DataField', Value: processingTime },
 { $Type: 'UI.DataField', Value: dataQuality },
    { $Type: 'UI.DataField', Label: 'Allocation Difficult Case', Value: allocationDifficultCases_ID }
  ]
};

annotate reception_autoSrv.AIRecommendations with {
  allocationDifficultCases @Common.Label: 'Allocation Difficult Case'
};

annotate reception_autoSrv.AIRecommendations with @UI.Facets: [
  { $Type: 'UI.ReferenceFacet', ID: 'Main', Label: 'General Information', Target: '@UI.FieldGroup#Main' }
];

annotate reception_autoSrv.AIRecommendations with @UI.SelectionFields: [
  allocationDifficultCases_ID
];

annotate reception_autoSrv.HumanDecisions with @UI.HeaderInfo: { TypeName: 'Human Decision', TypeNamePlural: 'Human Decisions' };
annotate reception_autoSrv.HumanDecisions with {
  allocationDifficultCases @Common.ValueList: {
    CollectionPath: 'AllocationDifficultCases',
    Parameters    : [
      {
        $Type            : 'Common.ValueListParameterInOut',
        LocalDataProperty: allocationDifficultCases_ID, 
        ValueListProperty: 'ID'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'caseDate'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'difficultyType'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'shortageItems'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'availableOptions'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'caseStatus'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'assignedTo'
      },
      {
        $Type            : 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'aiAnalysisRequested'
      },
    ],
  }
};
annotate reception_autoSrv.HumanDecisions with {
  decisionDate @title: 'Decision Date';
  decidedBy @title: 'Decided By';
  finalDecision @title: 'Final Decision';
  actualSolution @title: 'Actual Solution';
  decisionReason @title: 'Decision Reason';
  agreementLevel @title: 'Agreement Level';
  implementationStatus @title: 'Implementation Status';
  actualOutcome @title: 'Actual Outcome';
  satisfactionScore @title: 'Satisfaction Score'
};

annotate reception_autoSrv.HumanDecisions with @UI.LineItem: [
 { $Type: 'UI.DataField', Value: decisionDate },
 { $Type: 'UI.DataField', Value: decidedBy },
 { $Type: 'UI.DataField', Value: finalDecision },
 { $Type: 'UI.DataField', Value: actualSolution },
 { $Type: 'UI.DataField', Value: decisionReason },
 { $Type: 'UI.DataField', Value: agreementLevel },
 { $Type: 'UI.DataField', Value: implementationStatus },
 { $Type: 'UI.DataField', Value: actualOutcome },
 { $Type: 'UI.DataField', Value: satisfactionScore },
    { $Type: 'UI.DataField', Label: 'Allocation Difficult Case', Value: allocationDifficultCases_ID }
];

annotate reception_autoSrv.HumanDecisions with @UI.FieldGroup #Main: {
  $Type: 'UI.FieldGroupType', Data: [
 { $Type: 'UI.DataField', Value: decisionDate },
 { $Type: 'UI.DataField', Value: decidedBy },
 { $Type: 'UI.DataField', Value: finalDecision },
 { $Type: 'UI.DataField', Value: actualSolution },
 { $Type: 'UI.DataField', Value: decisionReason },
 { $Type: 'UI.DataField', Value: agreementLevel },
 { $Type: 'UI.DataField', Value: implementationStatus },
 { $Type: 'UI.DataField', Value: actualOutcome },
 { $Type: 'UI.DataField', Value: satisfactionScore },
    { $Type: 'UI.DataField', Label: 'Allocation Difficult Case', Value: allocationDifficultCases_ID }
  ]
};

annotate reception_autoSrv.HumanDecisions with {
  allocationDifficultCases @Common.Label: 'Allocation Difficult Case'
};

annotate reception_autoSrv.HumanDecisions with @UI.Facets: [
  { $Type: 'UI.ReferenceFacet', ID: 'Main', Label: 'General Information', Target: '@UI.FieldGroup#Main' }
];

annotate reception_autoSrv.HumanDecisions with @UI.SelectionFields: [
  allocationDifficultCases_ID
];

