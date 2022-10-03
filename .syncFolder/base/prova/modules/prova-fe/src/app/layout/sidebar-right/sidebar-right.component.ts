import { Component } from '@angular/core';
import { BzThemeService } from '@micegroup/voila2-blazing-ng';

@Component({
  selector: 'app-sidebar-right',
  templateUrl: './sidebar-right.component.html',
  styleUrls: ['./sidebar-right.component.scss']
})
export class SidebarRightComponent  {
	
 constructor(private themeService: BzThemeService) {}


  public setLightTheme() : void {
    this.themeService.setTheme('light-theme');
  }

  public setItaliaPaTheme() : void {
    this.themeService.setTheme('italiaPA-theme');
  }

  public setBlackTheme() : void {
    this.themeService.setTheme('black-theme');
  }

  public setBlueTheme() : void {
    this.themeService.setTheme('blue-theme');
  }

}
