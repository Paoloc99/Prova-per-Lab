import { registerLocaleData } from "@angular/common";
import { Injectable } from "@angular/core";
import it from '@angular/common/locales/it';
import en from '@angular/common/locales/en';
import es from '@angular/common/locales/es';
import fr from '@angular/common/locales/fr';
import de from '@angular/common/locales/de';
import { BzLocaleService } from '@micegroup/voila2-blazing-ng';


@Injectable()
export class LocaleService {


  constructor(private localeService: BzLocaleService) { }


  /**
   * Register culture.
   * 
   * @author Federico Gambardella<federico.gambardella@micegroup.it>
   * @param culture 
   */
  public registerCulture(culture: string) : void {

    if (!culture) {
      return;
    }
  
    //This horrendous switch is more performing than webpack solution..
    switch(culture) {
      case 'it': {
        registerLocaleData(it);
        break;
      }
      case 'en': {
        registerLocaleData(en);
        break;
      }
      case 'es': {
        registerLocaleData(es);
        break;
      }
      case 'fr': {
        registerLocaleData(fr);
        break;
      }
      case 'de': {
        registerLocaleData(de);
        break;
      }
    } 
    
    this.localeService.setLocale(culture);
  }

}