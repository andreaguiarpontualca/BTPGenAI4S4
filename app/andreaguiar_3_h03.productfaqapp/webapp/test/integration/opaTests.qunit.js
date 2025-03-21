sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'andreaguiar3h03/productfaqapp/test/integration/FirstJourney',
		'andreaguiar3h03/productfaqapp/test/integration/pages/ProductFAQList',
		'andreaguiar3h03/productfaqapp/test/integration/pages/ProductFAQObjectPage'
    ],
    function(JourneyRunner, opaJourney, ProductFAQList, ProductFAQObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('andreaguiar3h03/productfaqapp') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheProductFAQList: ProductFAQList,
					onTheProductFAQObjectPage: ProductFAQObjectPage
                }
            },
            opaJourney.run
        );
    }
);