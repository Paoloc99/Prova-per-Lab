import { NgModule } from '@angular/core';
import { ListOrdineComponent } from './list-ordine/list-ordine.component';
import { OrdineRoutingModule } from './ordine-routing.module';
import { SearchOrdineComponent } from './list-ordine/search-ordine/search-ordine.component';
import { DetailOrdineComponent } from './detail-ordine/detail-ordine.component';
import { TabsOrdineComponent } from './detail-ordine/tabs-ordine/tabs-ordine.component';
import { DialogListOrdineComponent } from '../dialog/dialog-list-ordine/dialog-list-ordine.component';
import { TabOrderItemComponent } from './detail-ordine/tabs-ordine/order-item/tab-order-item.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';

const COMPONENTS = [ListOrdineComponent, SearchOrdineComponent, DetailOrdineComponent, TabsOrdineComponent, DialogListOrdineComponent, TabOrderItemComponent];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [OrdineRoutingModule, SharedModule]
})
export class OrdineModule {}
