import { NgModule } from '@angular/core';
import { ListProductComponent } from './list-product/list-product.component';
import { ProductRoutingModule } from './product-routing.module';
import { SearchProductComponent } from './list-product/search-product/search-product.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { TabsProductComponent } from './detail-product/tabs-product/tabs-product.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';

const COMPONENTS = [ListProductComponent, SearchProductComponent, DetailProductComponent, TabsProductComponent];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [ProductRoutingModule, SharedModule]
})
export class ProductModule {}
