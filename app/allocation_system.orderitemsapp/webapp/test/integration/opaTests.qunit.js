sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'allocationsystem/orderitemsapp/test/integration/FirstJourney',
		'allocationsystem/orderitemsapp/test/integration/pages/OrderItemsList',
		'allocationsystem/orderitemsapp/test/integration/pages/OrderItemsObjectPage'
    ],
    function(JourneyRunner, opaJourney, OrderItemsList, OrderItemsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('allocationsystem/orderitemsapp') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheOrderItemsList: OrderItemsList,
					onTheOrderItemsObjectPage: OrderItemsObjectPage
                }
            },
            opaJourney.run
        );
    }
);