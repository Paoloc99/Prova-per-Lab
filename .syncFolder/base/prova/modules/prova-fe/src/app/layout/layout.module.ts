import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarLeftComponent } from './sidebar-left/sidebar-left.component';
import { BzLayoutModule, BzMenuModule, BzUserModule, BzActionModule, BzContextMenuModule, 
  BzBadgeModule, BzHttpProgressBarModule, BzButtonModule, BzDropdownModule } from '@micegroup/voila2-blazing-ng';
import { SidebarRightComponent } from './sidebar-right/sidebar-right.component';
import { RouterModule } from '@angular/router';


const COMPONENTS = [
  LayoutComponent,
  HeaderComponent,
  FooterComponent,
  SidebarLeftComponent,
  SidebarRightComponent
]

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    BzLayoutModule.forChild({
      isFooter: false
    }),
    BzMenuModule,
    BzUserModule,
    BzActionModule,
    BzContextMenuModule,
    BzBadgeModule,
    BzButtonModule,
    RouterModule,
    BzDropdownModule,
    BzHttpProgressBarModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class LayoutModule { }
