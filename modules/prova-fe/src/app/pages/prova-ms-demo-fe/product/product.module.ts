import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list-product/list-product.component';
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
import { ProductRoutingModule } from './product-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchProductComponent } from './list-product/search-product/search-product.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { RouterModule } from '@angular/router';
import { UtilityPipeModule } from '../../../utilities/pipe/utility-pipe.module';
import { TranslateModule } from '@micegroup/voila2-translate-ng';
import { TabsProductComponent } from './detail-product/tabs-product/tabs-product.component';
import { DialogListProductComponent } from '../dialog/dialog-list-product/dialog-list-product.component';
import { TabOrderItemComponent } from './detail-product/tabs-product/order-item/tab-order-item.component';

const COMPONENTS = [ListProductComponent, SearchProductComponent, DetailProductComponent, TabsProductComponent, DialogListProductComponent, TabOrderItemComponent];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [
        CommonModule,
        BzCardModule,
        BzTableModule,
        ProductRoutingModule,
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
export class ProductModule {}
