using {S4HCP_ServiceOrder_Odata} from './external/S4HCP_ServiceOrder_Odata.cds';
using {AndreAguiar_3_H03 as my} from '../db/schema.cds';

@path: '/service/andreAguiar_3_H03'
service andreAguiar_3_H03Srv {
    @odata.draft.enabled
    entity CustomerMessage as projection on my.CustomerMessage;

    entity A_ServiceOrder  as
        projection on S4HCP_ServiceOrder_Odata.A_ServiceOrder {
            ServiceOrder,
            ServiceOrderDescription
        };

    @odata.draft.enabled
    entity ProductFAQ      as
        projection on my.ProductFAQ {
            ID,
            issue,
            question,
            answer
        };
}

annotate andreAguiar_3_H03Srv with @requires: ['authenticated-user'];
