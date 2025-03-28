sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'andreaguiar3h03.customermessage',
            componentId: 'CustomerMessageObjectPage',
            contextPath: '/CustomerMessage'
        },
        CustomPageDefinitions
    );
});