import { registerLocaleData } from '@angular/common';
import { Component } from '@angular/core';
import it from "@angular/common/locales/it";
import { SecurityService } from '@micegroup/voila2-runtime-ng';
import {buildPrivilegesEnum} from './security/privilege';
import { environment } from 'src/environments/environment';
registerLocaleData(it);


@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   
  constructor(private securityService: SecurityService){}

  ngOnInit() {
	buildPrivilegesEnum();
    if (environment.securityOn) {
      this.securityService.manageToken();
      this.securityService.setPrivilages();
    }
  }
}
