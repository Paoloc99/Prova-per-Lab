import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOrderItemComponent } from './list-order-item/list-order-item.component';
import {
    BzButtonModule,
    BzCardModule,
    BzDropdownModule,
    BzErrorModule,
    BzEventModule,
    BzIconModule,
    BzInputModule,
    BzSwitchModule,
    BzSwitch3Module,
    BzTableModule,
    BzTabsetModule,
    BzToastrModule,
    BzTooltipModule,
    BzButtonsPanelModule,
    BzDialogModule
} from '@micegroup/voila2-blazing-ng';
import { OrderItemRoutingModule } from './order-item-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchOrderItemComponent } from './list-order-item/search-order-item/search-order-item.component';
import { DetailOrderItemComponent } from './detail-order-item/detail-order-item.component';
import { RouterModule } from '@angular/router';
import { UtilityPipeModule } from '../../../utilities/pipe/utility-pipe.module';
import { TranslateModule } from '@micegroup/voila2-translate-ng';
import { TabsOrderItemComponent } from './detail-order-item/tabs-order-item/tabs-order-item.component';

const COMPONENTS = [ListOrderItemComponent, SearchOrderItemComponent, DetailOrderItemComponent, TabsOrderItemComponent];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [
        CommonModule,
        BzCardModule,
        BzTableModule,
        OrderItemRoutingModule,
        BzButtonModule,
        BzInputModule,
        ReactiveFormsModule,

        BzSwitchModule,
        BzSwitch3Module,
        FormsModule,
        RouterModule,
        BzTooltipModule,
        BzDropdownModule,
        BzToastrModule,
        BzErrorModule,
        UtilityPipeModule,
        BzDialogModule,
        BzTabsetModule,
        BzEventModule,
        TranslateModule,
        BzIconModule,
        BzButtonsPanelModule
    ]
})
export class OrderItemModule {}
