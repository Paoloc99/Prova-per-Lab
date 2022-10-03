import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { BzLayoutService, User } from '@micegroup/voila2-blazing-ng';
import { LocaleService } from 'src/app/utilities/services/locale.service';
import { LANGUAGE, LANGUAGE_START } from './header.constant';
import { SecurityService } from '@micegroup/voila2-runtime-ng';
import { environment } from 'src/environments/environment';
import { VoilaTranslateService } from 'src/app/utilities/services/voila-translate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers:[LocaleService]
})
export class HeaderComponent {

  public utente!: User;
  public langaugeArray: any = LANGUAGE;
  public defaultLanguage: any = LANGUAGE_START;

  constructor(
         private layoutService: BzLayoutService, 
         private router: Router,
         private localeService: LocaleService,
         private securityService: SecurityService,
         private translateService: VoilaTranslateService
  ) { }

  ngAfterViewInit(): void {
    this._setCurrentUser();
  }

   /**
     * Toggle sidebar menu.
     * 
     * @author Federico Gambardella<federico.gambardella@micegroup.it>
     */
    public toggleSidebar(): void {
      this.layoutService.toggleMenuSidebar();
  
    }

    
    public goToPage() {
      this.router.navigate(['/page'])
    }


   /**
     * Sets current user.
     * 
     * @author Federico Gambardella<federico.gambardella@micegroup.it>
     */
    private _setCurrentUser() : void {
	 if (environment.securityOn)
      this.securityService.loadUserProfile().then((user: any)=> {
        this.utente = {
          name: user.firstName,
          surname: user.lastName,
        }
      })
    }


    /**
     * Change language.
     * 
     * @author Federico Gambardella<federico.gambardella@micegroup.it>
     * @param langauge 
     */
    public changeLanguage(langauge: any): void {
        this.localeService.registerCulture(langauge.language);
        this.translateService.setDefaultLang(langauge.language);
    }

    public logout() : void {
      this.securityService.logout();
    }

    public navigateToUserProfile(): void {
      this.securityService.accountManagement();
    }

}
