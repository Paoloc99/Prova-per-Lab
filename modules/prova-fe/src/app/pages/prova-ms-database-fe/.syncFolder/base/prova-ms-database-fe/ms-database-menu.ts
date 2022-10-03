import { MenuElement } from '@micegroup/voila2-blazing-ng/lib/components/menu/menu-element';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';

const Privileges = getPrivilegesEnum();

export const MENU_MS_DATABASE: MenuElement[] = [
    {
        label: 'Product',
        expectedPrivilege: Privileges.PRODUCT_SEARCH,
        path: '/pages/ms-database/product/list-product',
        basePath: '/pages/ms-database/product/'
    }
];
