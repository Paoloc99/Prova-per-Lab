import { MenuElement } from '@micegroup/voila2-blazing-ng/lib/components/menu/menu-element';
import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';

const Privileges = getPrivilegesEnum();

export const MENU_MS_STORE: MenuElement[] = [
    {
        label: 'Utente',
        expectedPrivilege: Privileges.UTENTE_SEARCH,
        path: '/pages/ms-store/utente/list-utente',
        basePath: '/pages/ms-store/utente/'
    },
    {
        label: 'Product',
        expectedPrivilege: Privileges.PRODUCT_SEARCH,
        path: '/pages/ms-store/product/list-product',
        basePath: '/pages/ms-store/product/'
    },
    {
        label: 'Ordine',
        expectedPrivilege: Privileges.ORDINE_SEARCH,
        path: '/pages/ms-store/ordine/list-ordine',
        basePath: '/pages/ms-store/ordine/'
    },
    {
        label: 'Order Item',
        expectedPrivilege: Privileges.ORDER_ITEM_SEARCH,
        path: '/pages/ms-store/order-item/list-order-item',
        basePath: '/pages/ms-store/order-item/'
    },
    {
        label: 'Gestione',
        iconClass: 'fas fa-stream',
        children: []
    }
];
