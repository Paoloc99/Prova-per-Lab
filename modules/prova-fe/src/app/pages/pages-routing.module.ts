import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { PagesComponent } from './pages.component';


const routes: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      {
        path:'home', component: HomepageComponent
      },
	  {
        path: "ms-store", loadChildren: () =>
          import("./prova-ms-store-fe/ms-store.module").then((m) => m.MsStoreModule),
      }
,	  {
        path: "ms-database", loadChildren: () =>
          import("./prova-ms-database-fe/ms-database.module").then((m) => m.MsDatabaseModule),
      }
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
