import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateService } from '@micegroup/voila2-blazing-ng';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApiService } from '../../../shared/base/base-api.service';
import { IOrdine } from './ordine.interface';
import { DemoEnvironment } from '../environment';
import { BaseApiResponse } from 'src/app/shared/base/base.response';

@Injectable()
export class OrdineApiService extends BaseApiService<IOrdine> {
    private url: string = DemoEnvironment.contextRoot + '/ordine';

    constructor(httpClient: HttpClient, dateService: DateService) {
        super(httpClient, dateService);
    }

    public getOrdineByCriteria(options?: HttpParams): Observable<BaseApiResponse<IOrdine>> {
        return this.getEntityListByCriteria(this.url, options);
    }

    public getOrdineByUtente(key: string, options?: HttpParams): Observable<BaseApiResponse<IOrdine>> {
        return this.httpClient.get<any>(this.baseUrl + '/' + this.url + '/findByTheUtente/' + key, { params: options });
    }

    public addOrdine(ordine: IOrdine): Observable<IOrdine> {
        return this.addEntityInstance(ordine, this.url);
    }

    public getOrdineById(id: string): Observable<IOrdine> {
        return this.getEntityInstanceById(id, this.url);
    }

    public updateOrdine(ordine: IOrdine): Observable<IOrdine> {
        return this.updateEntityInstance(ordine, this.url);
    }

    public deleteOrdine(id: string): Observable<IOrdine> {
        return this.deleteEntityInstance(id, this.url);
    }

    public printPdfReport(id: string): any {
        window.open(this.baseUrl + '/' + this.url + '/pdf/' + id);
    }

    public printXlsxReport(): any {
        window.open(this.baseUrl + '/' + this.url + '/print/xlsx-list');
    }
}
