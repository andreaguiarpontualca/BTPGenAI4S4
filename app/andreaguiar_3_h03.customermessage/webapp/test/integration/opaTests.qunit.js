sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'andreaguiar3h03/customermessage/test/integration/FirstJourney',
		'andreaguiar3h03/customermessage/test/integration/pages/CustomerMessageList',
		'andreaguiar3h03/customermessage/test/integration/pages/CustomerMessageObjectPage'
    ],
    function(JourneyRunner, opaJourney, CustomerMessageList, CustomerMessageObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('andreaguiar3h03/customermessage') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheCustomerMessageList: CustomerMessageList,
					onTheCustomerMessageObjectPage: CustomerMessageObjectPage
                }
            },
            opaJourney.run
        );
    }
);