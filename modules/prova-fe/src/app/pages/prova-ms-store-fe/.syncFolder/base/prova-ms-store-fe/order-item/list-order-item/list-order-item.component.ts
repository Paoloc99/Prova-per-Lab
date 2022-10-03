import { HttpParams } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { PageObject, PaginationUtils } from '@micegroup/voila2-blazing-ng';
import { BaseComponent } from '../../../../shared/base/base.component';
import { IOrderItem } from '../order-item.interface';
import { OrderItemApiService } from '../order-item-api.service';
import { ButtonService } from '../../../../utilities/services/buttons.service';
import { SearchOrderItemComponent } from './search-order-item/search-order-item.component';
import { Router } from '@angular/router';
import { navigateToPath, getPrivilegesEnum, getPrivileges, ApiResponse, extractTotalElements } from '@micegroup/voila2-runtime-ng';
import { setOptions } from 'src/app/utilities/function/helper';
import { ORDER_ITEM } from '../order-item.constant';

@Component({
    selector: 'app-list-order-item',
    templateUrl: './list-order-item.component.html',
    styleUrls: ['../order-item.scss'],
    providers: [OrderItemApiService, ButtonService]
})
export class ListOrderItemComponent extends BaseComponent {
    public orderItemList: IOrderItem[] = [];
    public orderItem!: IOrderItem;
    public totalPages: number = 0;
    public spinner: boolean = true;
    public orderItemCriteria!: any;
    public pageSize: number = 5;
    public page: number = 0;
    public totalElements: number = 0;

    public privileges: string[] = getPrivileges();

    public get Privileges(): any {
        return getPrivilegesEnum();
    }

    @ViewChild(SearchOrderItemComponent) searchOrderItem!: SearchOrderItemComponent;

    constructor(private orderItemApiService: OrderItemApiService, public router: Router) {
        super();
    }

    public paginateTable(pageObject: PageObject, filter?: string): void {
        const options: HttpParams = setOptions(pageObject, filter);
        this.orderItemApiService.getOrderItemByCriteria(options).subscribe(
            (data: any) => {
                this.orderItemList = data.content;
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
        this.orderItemCriteria = this.searchOrderItem.search();
        const object: PageObject = { page: 0, pageSize: this.pageSize };
        this.paginateTable(object, this.orderItemCriteria);
    }

    public navigateToView(id: number): void {
        navigateToPath(ORDER_ITEM.PATH.DETAIL + id + this.PATH_VIEW, this.router);
    }
}
