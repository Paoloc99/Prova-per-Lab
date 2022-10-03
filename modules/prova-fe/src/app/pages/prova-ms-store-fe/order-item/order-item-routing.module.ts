import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { getAuthGuards } from 'src/app/security/security.config';
import { AuthGuard, getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';
import { DetailOrderItemComponent } from './detail-order-item/detail-order-item.component';
import { ListOrderItemComponent } from './list-order-item/list-order-item.component';

const Privileges = getPrivilegesEnum();

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list-order-item',
                component: ListOrderItemComponent,
                canActivate: getAuthGuards(),
                data: { privileges: [Privileges?.ORDER_ITEM_SEARCH] }
            },
            {
                path: 'detail-order-item/new',
                component: DetailOrderItemComponent,
                canActivate: getAuthGuards(),
                data: { pageSatus: 'new', privileges: [Privileges?.ORDER_ITEM_CREATE] }
            },
            {
                path: 'detail-order-item/:id/view',
                component: DetailOrderItemComponent,
                canActivate: getAuthGuards(),
                data: { pageSatus: 'view', privileges: [Privileges?.ORDER_ITEM_READ] }
            },
            {
                path: 'detail-order-item/:id/edit',
                component: DetailOrderItemComponent,
                canActivate: getAuthGuards(),
                data: { pageSatus: 'edit', privileges: [Privileges?.ORDER_ITEM_UPDATE] }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderItemRoutingModule {}
