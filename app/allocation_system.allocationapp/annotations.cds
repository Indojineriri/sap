using allocation_systemSrv as service from '../../srv/service';

// Orders エンティティのみの安全な UI表示設定
// 他のエンティティは既存のannotationsファイルとの競合を避けるため含めていません

annotate service.Orders with @(
    // リストページのテーブル表示項目を拡張
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : orderNumber,
            Label : 'Order Number',
            ![@UI.Importance] : #High
        },
        {
            $Type : 'UI.DataField',
            Value : customer_customerId,
            Label : 'Customer',
            ![@UI.Importance] : #High
        },
        {
            $Type : 'UI.DataField',
            Value : orderDate,
            Label : 'Order Date',
            ![@UI.Importance] : #Medium
        },
        {
            $Type : 'UI.DataField',
            Value : requestedDate,
            Label : 'Requested Date',
            ![@UI.Importance] : #Medium
        },
        {
            $Type : 'UI.DataField',
            Value : businessImpact,
            Label : 'Priority',
            ![@UI.Importance] : #High
        },
        {
            $Type : 'UI.DataField',
            Value : urgencyReason,
            Label : 'Urgency Reason',
            ![@UI.Importance] : #Medium
        },
        {
            $Type : 'UI.DataField',
            Value : negotiationRoom,
            Label : 'Negotiation',
            ![@UI.Importance] : #Low
        },
        {
            $Type : 'UI.DataField',
            Value : modifiedBy,
            Label : 'Modified By',
            ![@UI.Importance] : #Low
        },
        {
            $Type : 'UI.DataField',
            Value : aiComment,
            Label : 'AI Analysis',
            ![@UI.Importance] : #High
        }
    ],
    
    // 検索・フィルター項目
    UI.SelectionFields : [
        orderNumber,
        customer_customerId,
        businessImpact,
        urgencyReason,
        orderDate
    ],
    
    // ヘッダー情報表示
    UI.HeaderInfo : {
        $Type : 'UI.HeaderInfoType',
        TypeName : 'Order',
        TypeNamePlural : 'Orders',
        Title : {
            $Type : 'UI.DataField',
            Value : orderNumber
        },
        Description : {
            $Type : 'UI.DataField',
            Value : customer_customerId
        }
    },
    
    // 詳細画面のセクション構成
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'OrderDetails',
            Label : 'Order Information',
            Target : '@UI.FieldGroup#OrderDetails'
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'BusinessContext',
            Label : 'Business Context',
            Target : '@UI.FieldGroup#BusinessContext'
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'AIAnalysis',
            Label : 'AI Analysis',
            Target : '@UI.FieldGroup#AIAnalysis'
        }
    ],
    
    // フィールドグループ: 基本注文情報
    UI.FieldGroup #OrderDetails : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : orderNumber,
                Label : 'Order Number'
            },
            {
                $Type : 'UI.DataField',
                Value : customer_customerId,
                Label : 'Customer ID'
            },
            {
                $Type : 'UI.DataField',
                Value : orderDate,
                Label : 'Order Date'
            },
            {
                $Type : 'UI.DataField',
                Value : requestedDate,
                Label : 'Requested Delivery Date'
            },
            {
                $Type : 'UI.DataField',
                Value : createdBy,
                Label : 'Created By'
            },
            {
                $Type : 'UI.DataField',
                Value : modifiedBy,
                Label : 'Last Modified By'
            }
        ]
    },
    
    // フィールドグループ: ビジネスコンテキスト
    UI.FieldGroup #BusinessContext : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : businessImpact,
                Label : 'Business Impact Level'
            },
            {
                $Type : 'UI.DataField',
                Value : urgencyReason,
                Label : 'Urgency Reason'
            },
            {
                $Type : 'UI.DataField',
                Value : negotiationRoom,
                Label : 'Negotiation Opportunities'
            }
        ]
    },
    
    // フィールドグループ: AI分析
    UI.FieldGroup #AIAnalysis : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : aiComment,
                Label : 'AI-Generated Analysis'
            }
        ]
    }
);