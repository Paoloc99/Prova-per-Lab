
import { ObjectUtils } from '@micegroup/voila2-blazing-ng';
import {setPrivilegesEnum} from '@micegroup/voila2-runtime-ng';
import {StorePrivileges} from '../pages/prova-ms-store-fe/privilege.enum';
import {DatabasePrivileges} from '../pages/prova-ms-database-fe/privilege.enum';


export function buildPrivilegesEnum() {
  const privileges = ObjectUtils.merge(
    StorePrivileges,
    DatabasePrivileges,
  )
  setPrivilegesEnum(privileges);
}
