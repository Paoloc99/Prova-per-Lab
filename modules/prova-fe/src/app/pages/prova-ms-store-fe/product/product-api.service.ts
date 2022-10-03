import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateService } from '@micegroup/voila2-blazing-ng';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApiService } from '../../../shared/base/base-api.service';
import { IProduct } from './product.interface';
import { StoreEnvironment } from '../environment';
import { BaseApiResponse } from 'src/app/shared/base/base.response';

@Injectable()
export class ProductApiService extends BaseApiService<IProduct> {
    private url: string = StoreEnvironment.contextRoot + '/product';

    constructor(httpClient: HttpClient, dateService: DateService) {
        super(httpClient, dateService);
    }

    public getProductByCriteria(options?: HttpParams): Observable<BaseApiResponse<IProduct>> {
        return this.getEntityListByCriteria(this.url, options);
    }

    public addProduct(product: IProduct): Observable<IProduct> {
        return this.addEntityInstance(product, this.url);
    }

    public getProductById(id: string): Observable<IProduct> {
        return this.getEntityInstanceById(id, this.url);
    }

    public updateProduct(product: IProduct): Observable<IProduct> {
        return this.updateEntityInstance(product, this.url);
    }

    public deleteProduct(id: string): Observable<IProduct> {
        return this.deleteEntityInstance(id, this.url);
    }

    public printPdfReport(id: string): any {
        window.open(this.baseUrl + '/' + this.url + '/pdf/' + id);
    }

    public printXlsxReport(): any {
        window.open(this.baseUrl + '/' + this.url + '/print/xlsx-list');
    }
}
