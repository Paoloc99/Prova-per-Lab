import { HttpParams } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { PageObject, PaginationUtils } from '@micegroup/voila2-blazing-ng';
import { BaseComponent } from '../../../../shared/base/base.component';
import { IProduct } from '../product.interface';
import { ProductApiService } from '../product-api.service';
import { ButtonService } from '../../../../utilities/services/buttons.service';
import { SearchProductComponent } from './search-product/search-product.component';
import { Router } from '@angular/router';
import { navigateToPath, getPrivilegesEnum, getPrivileges, ApiResponse, extractTotalElements } from '@micegroup/voila2-runtime-ng';
import { setOptions } from 'src/app/utilities/function/helper';
import { PRODUCT } from '../product.constant';

@Component({
    selector: 'app-list-product',
    templateUrl: './list-product.component.html',
    styleUrls: ['../product.scss'],
    providers: [ProductApiService, ButtonService]
})
export class ListProductComponent extends BaseComponent {
    public productList: IProduct[] = [];
    public product!: IProduct;
    public totalPages: number = 0;
    public spinner: boolean = true;
    public productCriteria!: any;
    public pageSize: number = 5;
    public page: number = 0;
    public totalElements: number = 0;

    public privileges: string[] = getPrivileges();

    public get Privileges(): any {
        return getPrivilegesEnum();
    }

    @ViewChild(SearchProductComponent) searchProduct!: SearchProductComponent;

    constructor(private productApiService: ProductApiService, public router: Router) {
        super();
    }

    public paginateTable(pageObject: PageObject, filter?: string): void {
        const options: HttpParams = setOptions(pageObject, filter);
        this.productApiService.getProductByCriteria(options).subscribe(
            (data: any) => {
                this.productList = data.content;
                this.totalPages = data.totalPages;
                this.totalElements = data.totalElements;
                this.page = data.number;
                this.spinner = false;
            },
            () => {
                this.spinner = false;
            }
        );
    }

    public searchWithCriteria(): void {
        this.productCriteria = this.searchProduct.search();
        const object: PageObject = { page: 0, pageSize: this.pageSize };
        this.paginateTable(object, this.productCriteria);
    }

    public navigateToView(id: number): void {
        navigateToPath(PRODUCT.PATH.DETAIL + id + this.PATH_VIEW, this.router);
    }

    public printXlsxReport(): void {
        this.productApiService.printXlsxReport();
    }
}
