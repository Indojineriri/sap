sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'receptionauto/allocationdifficultcase/test/integration/FirstJourney',
		'receptionauto/allocationdifficultcase/test/integration/pages/AllocationDifficultCasesList',
		'receptionauto/allocationdifficultcase/test/integration/pages/AllocationDifficultCasesObjectPage',
		'receptionauto/allocationdifficultcase/test/integration/pages/AIRecommendationsObjectPage'
    ],
    function(JourneyRunner, opaJourney, AllocationDifficultCasesList, AllocationDifficultCasesObjectPage, AIRecommendationsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('receptionauto/allocationdifficultcase') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheAllocationDifficultCasesList: AllocationDifficultCasesList,
					onTheAllocationDifficultCasesObjectPage: AllocationDifficultCasesObjectPage,
					onTheAIRecommendationsObjectPage: AIRecommendationsObjectPage
                }
            },
            opaJourney.run
        );
    }
);