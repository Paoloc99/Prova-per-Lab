import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOrdineComponent } from './list-ordine/list-ordine.component';
import {
    BzButtonModule,
    BzCardModule,
    BzDatePickerModule,
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
import { OrdineRoutingModule } from './ordine-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchOrdineComponent } from './list-ordine/search-ordine/search-ordine.component';
import { DetailOrdineComponent } from './detail-ordine/detail-ordine.component';
import { RouterModule } from '@angular/router';
import { UtilityPipeModule } from '../../../utilities/pipe/utility-pipe.module';
import { TranslateModule } from '@micegroup/voila2-translate-ng';
import { TabsOrdineComponent } from './detail-ordine/tabs-ordine/tabs-ordine.component';
import { DialogListOrdineComponent } from '../dialog/dialog-list-ordine/dialog-list-ordine.component';
import { TabOrderItemComponent } from './detail-ordine/tabs-ordine/order-item/tab-order-item.component';

const COMPONENTS = [ListOrdineComponent, SearchOrdineComponent, DetailOrdineComponent, TabsOrdineComponent, DialogListOrdineComponent, TabOrderItemComponent];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [
        CommonModule,
        BzCardModule,
        BzTableModule,
        OrdineRoutingModule,
        BzButtonModule,
        BzInputModule,
        ReactiveFormsModule,
        BzDatePickerModule,

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
export class OrdineModule {}
