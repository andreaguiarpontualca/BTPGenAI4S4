using { AndreAguiar_3_H03 as my } from '../db/schema.cds';

@path: '/service/andreAguiar_3_H03'
@requires: 'authenticated-user'
service andreAguiar_3_H03Srv {
  @odata.draft.enabled
  entity CustomerMessage as projection on my.CustomerMessage;
}