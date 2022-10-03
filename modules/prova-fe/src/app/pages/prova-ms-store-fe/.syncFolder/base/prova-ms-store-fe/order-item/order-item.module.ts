import { NgModule } from '@angular/core';
import { ListOrderItemComponent } from './list-order-item/list-order-item.component';
import { OrderItemRoutingModule } from './order-item-routing.module';
import { SearchOrderItemComponent } from './list-order-item/search-order-item/search-order-item.component';
import { DetailOrderItemComponent } from './detail-order-item/detail-order-item.component';
import { TabsOrderItemComponent } from './detail-order-item/tabs-order-item/tabs-order-item.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';

const COMPONENTS = [ListOrderItemComponent, SearchOrderItemComponent, DetailOrderItemComponent, TabsOrderItemComponent];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [OrderItemRoutingModule, SharedModule]
})
export class OrderItemModule {}
