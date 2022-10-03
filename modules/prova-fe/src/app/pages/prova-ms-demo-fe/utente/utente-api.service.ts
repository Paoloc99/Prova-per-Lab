import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateService } from '@micegroup/voila2-blazing-ng';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApiService } from '../../../shared/base/base-api.service';
import { IUtente } from './utente.interface';
import { DemoEnvironment } from '../environment';
import { BaseApiResponse } from 'src/app/shared/base/base.response';

@Injectable()
export class UtenteApiService extends BaseApiService<IUtente> {
    private url: string = DemoEnvironment.contextRoot + '/utente';

    constructor(httpClient: HttpClient, dateService: DateService) {
        super(httpClient, dateService);
    }

    public getUtenteByCriteria(options?: HttpParams): Observable<BaseApiResponse<IUtente>> {
        return this.getEntityListByCriteria(this.url, options);
    }

    public addUtente(utente: IUtente): Observable<IUtente> {
        return this.addEntityInstance(utente, this.url);
    }

    public getUtenteById(id: string): Observable<IUtente> {
        return this.getEntityInstanceById(id, this.url);
    }

    public updateUtente(utente: IUtente): Observable<IUtente> {
        return this.updateEntityInstance(utente, this.url);
    }

    public deleteUtente(id: string): Observable<IUtente> {
        return this.deleteEntityInstance(id, this.url);
    }

    public printPdfReport(id: string): any {
        window.open(this.baseUrl + '/' + this.url + '/pdf/' + id);
    }

    public printXlsxReport(): any {
        window.open(this.baseUrl + '/' + this.url + '/print/xlsx-list');
    }
}
