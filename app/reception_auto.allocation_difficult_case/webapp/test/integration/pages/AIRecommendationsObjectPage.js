sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'receptionauto.allocationdifficultcase',
            componentId: 'AIRecommendationsObjectPage',
            contextPath: '/AllocationDifficultCases/aiRecommendations'
        },
        CustomPageDefinitions
    );
});