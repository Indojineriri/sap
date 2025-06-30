sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'allocationsystem/allocationapp/test/integration/FirstJourney',
		'allocationsystem/allocationapp/test/integration/pages/OrdersList',
		'allocationsystem/allocationapp/test/integration/pages/OrdersObjectPage'
    ],
    function(JourneyRunner, opaJourney, OrdersList, OrdersObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('allocationsystem/allocationapp') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheOrdersList: OrdersList,
					onTheOrdersObjectPage: OrdersObjectPage
                }
            },
            opaJourney.run
        );
    }
);