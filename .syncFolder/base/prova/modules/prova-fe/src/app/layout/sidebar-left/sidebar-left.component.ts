import { ChangeDetectionStrategy, Component} from '@angular/core';
import { MenuElement } from '@micegroup/voila2-blazing-ng/lib/components/menu/menu-element';
import { MENU_HOME } from '../../pages/homepage/homepage-menu';
import { getPrivileges } from '@micegroup/voila2-runtime-ng';

import {MENU_MS_STORE} from '../../pages/prova-ms-store-fe/ms-store-menu';
import {MENU_MS_DATABASE} from '../../pages/prova-ms-database-fe/ms-database-menu';

const MS_MENU_ITEMS : MenuElement[] = [
	...MENU_HOME,
	...MENU_MS_STORE
,
	...MENU_MS_DATABASE
,

]

@Component({
  selector: 'app-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarLeftComponent  {

  public privileges: string[] = getPrivileges();

  public MENU_ELEMENTS: MenuElement[] =  [...MS_MENU_ITEMS];


}



