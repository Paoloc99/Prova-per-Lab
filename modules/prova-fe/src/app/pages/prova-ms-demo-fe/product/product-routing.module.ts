import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { getAuthGuards } from 'src/app/security/security.config';
import { AuthGuard, getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { ListProductComponent } from './list-product/list-product.component';

const Privileges = getPrivilegesEnum();

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list-product',
                component: ListProductComponent,
                canActivate: getAuthGuards(),
                data: { privileges: [Privileges?.PRODUCT_SEARCH] }
            },
            {
                path: 'detail-product/new',
                component: DetailProductComponent,
                canActivate: getAuthGuards(),
                data: { pageSatus: 'new', privileges: [Privileges?.PRODUCT_CREATE] }
            },
            {
                path: 'detail-product/:id/view',
                component: DetailProductComponent,
                canActivate: getAuthGuards(),
                data: { pageSatus: 'view', privileges: [Privileges?.PRODUCT_READ] }
            },
            {
                path: 'detail-product/:id/edit',
                component: DetailProductComponent,
                canActivate: getAuthGuards(),
                data: { pageSatus: 'edit', privileges: [Privileges?.PRODUCT_UPDATE] }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule {}
