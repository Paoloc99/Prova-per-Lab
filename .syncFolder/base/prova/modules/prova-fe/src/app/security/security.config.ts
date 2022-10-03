
import {  AuthGuard, SecurityService } from '@micegroup/voila2-runtime-ng';
import { environment } from 'src/environments/environment';
import { APP_INITIALIZER, Provider } from '@angular/core';
import {getFakeProvider} from '@micegroup/voila2-blazing-ng'

  export function securityConfig(securityInstance: SecurityService) {
    return () =>
    securityInstance.init({
        config: {
          url: environment.authUrl,
          realm: 'prova',
          clientId: environment.clientId,
        },
        initOptions: {
          onLoad: 'login-required'
      },
     });
  }

  export function getAuthGuards() : any {
    if(environment.securityOn)
      return [ AuthGuard ];
  }


  export function manageSecurityConfig(): Provider {
    if (environment.securityOn)
      return {
       provide: APP_INITIALIZER,
       useFactory: securityConfig,
       multi: true,
       deps: [ SecurityService],
     }
   return getFakeProvider();
}

