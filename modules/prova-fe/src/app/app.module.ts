import { APP_INITIALIZER,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseComponent } from './shared/base/base.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BzThemeModule, BzHttpProgressBarInterceptor} from '@micegroup/voila2-blazing-ng';
import { ConfirmDialogComponent } from './utilities/dialog/confirm-dialog/confirm-dialog.component'
import { WebInterceptor } from './shared/interceptor/error.interceptor';
import {TranslateModule, TranslateLoader } from '@micegroup/voila2-translate-ng'
import { securityConfig } from './security/security.config';
import { SecurityService } from '@micegroup/voila2-runtime-ng';
import {  manageSecurityConfig } from './security/security.config';
import { LazyTranslateLoader } from './translate.config';
import { VoilaTranslateService } from './utilities/services/voila-translate.service';
import { SharedModule } from 'src/app/shared/shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BzThemeModule.forRoot(),
    SharedModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useClass: LazyTranslateLoader,
          deps: [HttpClient]
      }
  })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WebInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BzHttpProgressBarInterceptor, multi: true},
    manageSecurityConfig(),
    VoilaTranslateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

