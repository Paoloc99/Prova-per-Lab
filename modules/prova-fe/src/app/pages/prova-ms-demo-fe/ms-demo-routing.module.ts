import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'utente',
                loadChildren: () => import('./utente/utente.module').then(m => m.UtenteModule)
            },

            {
                path: 'product',
                loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
            },

            {
                path: 'ordine',
                loadChildren: () => import('./ordine/ordine.module').then(m => m.OrdineModule)
            },

            {
                path: 'order-item',
                loadChildren: () => import('./order-item/order-item.module').then(m => m.OrderItemModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MsDemoRoutingModule {}
