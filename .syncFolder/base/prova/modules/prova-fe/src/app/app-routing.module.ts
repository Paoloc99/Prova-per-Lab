import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "pages",
        loadChildren: () =>
          import("./pages/pages.module").then(
            (m) => m.PagesModule
          ),
  },
  { path: '', redirectTo: 'pages/home', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }