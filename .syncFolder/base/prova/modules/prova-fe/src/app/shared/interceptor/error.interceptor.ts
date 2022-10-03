import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'src/app/utilities/services/toastr.service';
import { SecurityService } from '@micegroup/voila2-runtime-ng';
import { VoilaTranslateService } from 'src/app/utilities/services/voila-translate.service';

@Injectable()
export class WebInterceptor implements HttpInterceptor {
    constructor(private toasterService: ToastrService, private securityService: SecurityService, private translateService: VoilaTranslateService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authReq = req.clone({
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            })
        });

        if (req.method === 'POST' || req.method === 'PUT') {
            this.shiftDates(req.body);
        }

        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                let e: any = error.error;
                console.info('Error.....', e);
                if (error.status == 401) {
                    this.securityService.logOut();
                }
                if (error.status == 400) {
                    if (e.reasonPhrase == 'AlreadyFoundException') {
                        //FIXME - Trovare un modo che funzioni senza il setTimeout!!!!!
                        setTimeout(() => {
                            this.toasterService.showDanger(this.translateService.instant('errors.AlreadyFoundException', { resource: this.translateService.resolveEntity(e.message.resource), id: e.message.id }));
                        }, 300);
                        return throwError(error);
                    }
                    if (e.reasonPhrase == 'MethodArgumentValidationFailed') {
                        for (let m of e.message) {
                            let msg: string = this.translateService.resolveMessage(m);
                            this.toasterService.showDanger(msg);
                        }
                        return throwError(error);
                    }
                }
                if (error.status == 404) {
                    if (e.reasonPhrase == 'NotFoundException') {
                        setTimeout(() => {
                            this.toasterService.showDanger(this.translateService.instant('errors.NotFoundException', { resource: this.translateService.resolveEntity(e.message.resource), id: e.message.id }));
                        }, 300);
                        return throwError(error);
                    }
                }
                if (error.status == 409) {
                    if (e.reasonPhrase == 'BusinessException') {
                        for (let m of e.message) {
                            console.log(m);
                            let msg:string = m.messageDescription;
                            if (m.messageKey != null) {
                                msg = this.translateService.instant(m.messageKey, m.args);
                            }
                            //FIXME: Onorare l'eventuale presenza di error.key con arguments
                            if (m.severity == 'INFO') {
                                this.toasterService.showInfo(msg);
                            } else if (m.severity == 'WARNING') {
                                this.toasterService.showWarning(msg);
                            } else {
                                this.toasterService.showDanger(msg);
                            }
                        }
                        return throwError(error);
                    }
                }
                this.toasterService.showDanger(error.message);
                return throwError(error);
            })
        );
    }

    shiftDates(body: any) {
        if (body === null || body === undefined) {
            return body;
        }
    
        if (typeof body !== 'object') {
            return body;
        }
    
        for (const key of Object.keys(body)) {
            const value = body[key];
            if (value instanceof Date) {
                body[key] = new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate(), value.getHours(), value.getMinutes(), value.getSeconds())).toISOString().slice(0, -1);
            } else if (typeof value === 'object') {
                this.shiftDates(value);
            }
        }
      }
}
