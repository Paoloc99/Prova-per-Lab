import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateService } from '@micegroup/voila2-blazing-ng';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApiService } from '../../../shared/base/base-api.service';
import { IOrderItem } from './order-item.interface';
import { StoreEnvironment } from '../environment';
import { BaseApiResponse } from 'src/app/shared/base/base.response';

@Injectable()
export class OrderItemApiService extends BaseApiService<IOrderItem> {
    private url: string = StoreEnvironment.contextRoot + '/order-item';

    constructor(httpClient: HttpClient, dateService: DateService) {
        super(httpClient, dateService);
    }

    public getOrderItemByCriteria(options?: HttpParams): Observable<BaseApiResponse<IOrderItem>> {
        return this.getEntityListByCriteria(this.url, options);
    }

    public getOrderItemByOrdine(key: string, options?: HttpParams): Observable<BaseApiResponse<IOrderItem>> {
        return this.httpClient.get<any>(this.baseUrl + '/' + this.url + '/findByTheOrdine/' + key, { params: options });
    }
    public getOrderItemByProduct(key: string, options?: HttpParams): Observable<BaseApiResponse<IOrderItem>> {
        return this.httpClient.get<any>(this.baseUrl + '/' + this.url + '/findByTheProduct/' + key, { params: options });
    }

    public addOrderItem(orderItem: IOrderItem): Observable<IOrderItem> {
        return this.addEntityInstance(orderItem, this.url);
    }

    public getOrderItemById(id: string): Observable<IOrderItem> {
        return this.getEntityInstanceById(id, this.url);
    }

    public updateOrderItem(orderItem: IOrderItem): Observable<IOrderItem> {
        return this.updateEntityInstance(orderItem, this.url);
    }

    public deleteOrderItem(id: string): Observable<IOrderItem> {
        return this.deleteEntityInstance(id, this.url);
    }

    public printPdfReport(id: string): any {
        window.open(this.baseUrl + '/' + this.url + '/pdf/' + id);
    }

    public printXlsxReport(): any {
        window.open(this.baseUrl + '/' + this.url + '/print/xlsx-list');
    }
}
