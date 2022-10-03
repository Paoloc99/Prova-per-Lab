import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { LayoutModule } from '../layout/layout.module';
import { PagesRoutingModule } from './pages-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { BzButtonModule, BzCardModule, BzCheckboxModule, BzTableModule, BzTabsetModule } from '@micegroup/voila2-blazing-ng';
import { OrderChartComponent } from './homepage/order-chart/order-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { ListLastSalesComponent } from './homepage/list-last-sales/list-last-sales.component';
import { SalesOverviewComponent } from './homepage/sales-overview/sales-overview.component';
import { ClientAgeComponent } from './homepage/client-gender/client-age.component';



const COMPONENT = [
  PagesComponent, 
  HomepageComponent,
  OrderChartComponent, 
  ListLastSalesComponent, 
  SalesOverviewComponent,
  ClientAgeComponent
]

@NgModule({
  declarations: [...COMPONENT],
  imports: [
    CommonModule,
    LayoutModule,
    PagesRoutingModule,
    BzCheckboxModule,
    BzCardModule,
    BzTabsetModule,
    BzTableModule,
    BzButtonModule,
    NgxEchartsModule.forRoot({
      echarts,
    })
  ]
})
export class PagesModule { }
