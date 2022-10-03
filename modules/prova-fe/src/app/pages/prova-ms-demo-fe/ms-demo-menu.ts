import { MenuElement } from '@micegroup/voila2-blazing-ng/lib/components/menu/menu-element';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';

const Privileges = getPrivilegesEnum();

export const MENU_MS_DEMO: MenuElement[] = [
    {
        label: 'Utente',
        expectedPrivilege: Privileges.UTENTE_SEARCH,
        path: '/pages/ms-demo/utente/list-utente',
        basePath: '/pages/ms-demo/utente/'
    },
    {
        label: 'Product',
        expectedPrivilege: Privileges.PRODUCT_SEARCH,
        path: '/pages/ms-demo/product/list-product',
        basePath: '/pages/ms-demo/product/'
    },
    {
        label: 'Ordine',
        expectedPrivilege: Privileges.ORDINE_SEARCH,
        path: '/pages/ms-demo/ordine/list-ordine',
        basePath: '/pages/ms-demo/ordine/'
    },
    {
        label: 'Order Item',
        expectedPrivilege: Privileges.ORDER_ITEM_SEARCH,
        path: '/pages/ms-demo/order-item/list-order-item',
        basePath: '/pages/ms-demo/order-item/'
    },
    {
        label: 'Gestione',
        iconClass: 'fas fa-stream',
        children: []
    }
];
