import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { BzDialogService, BzSize, PaginationUtils } from '@micegroup/voila2-blazing-ng';
import { IProduct } from '../../product/product.interface';
import { ProductApiService } from '../../product/product-api.service';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { ButtonService } from 'src/app/utilities/services/buttons.service';

const PROVIDERS = [ProductApiService, ButtonService];

@Component({
    selector: 'app-dialog-list-product',
    templateUrl: './dialog-list-product.component.html',
    styleUrls: ['../../product/product.scss'],
    providers: [...PROVIDERS]
})
export class DialogListProductComponent extends BaseComponent {
    public productList: IProduct[] = [];
    public totalPages: number = 0;
    public spinner = true;
    public pageSize = 5;
    public cardSize = BzSize.LARGE;
    public page: number = 0;
    public totalElements: number = 0;

    constructor(private productApiService: ProductApiService, public buttonsService: ButtonService, private dialogService: BzDialogService) {
        super();
    }

    public paginateTable(object: any, criteria?: any): void {
        const options: HttpParams = PaginationUtils.setOptionsForSpring(object, criteria);
        this.productApiService.getProductByCriteria(options).subscribe(
            (data: any) => {
                this.productList = data.content;
                this.totalPages = data.totalPages;
                this.page = data.number;
                this.totalElements = data.totalElements;
                this.spinner = false;
            },
            () => {
                this.spinner = false;
            }
        );
    }

    public selectElement(product: IProduct): void {
        this.dialogService.closeDialog(product);
    }
}
