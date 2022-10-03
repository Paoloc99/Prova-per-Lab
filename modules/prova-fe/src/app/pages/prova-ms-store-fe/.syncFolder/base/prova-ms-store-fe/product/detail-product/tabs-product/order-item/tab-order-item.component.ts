import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PageObject, BzTableUtils, BzTabComponent } from '@micegroup/voila2-blazing-ng';
import { OrderItemApiService } from 'src/app/pages/prova-ms-store-fe/order-item/order-item-api.service';
import { orderItemForm } from 'src/app/pages/prova-ms-store-fe/order-item/order-item-form';
import { IOrderItem } from 'src/app/pages/prova-ms-store-fe/order-item/order-item.interface';
import { IOrdine } from 'src/app/pages/prova-ms-store-fe/ordine/ordine.interface';
import { OrdineApiService } from 'src/app/pages/prova-ms-store-fe/ordine/ordine-api.service';
import { OrderItemGroupApiService } from 'src/app/pages/prova-ms-store-fe/order-item/order-item-group-api.service';
import { BaseTabComponent } from 'src/app/shared/base/base-tab.component';
import { fillOptions, getListForDropdowns } from 'src/app/shared/base/base.helper';
import { navigateToPath, isInViewMode, PageStatus } from '@micegroup/voila2-runtime-ng';
import { IProduct } from '../../../product.interface';
import { ORDER_ITEM } from 'src/app/pages/prova-ms-store-fe/order-item/order-item.constant';

@Component({
    selector: 'app-tab-order-item',
    templateUrl: './tab-order-item.component.html',
    styleUrls: ['../../../product.scss'],
    providers: [OrderItemApiService, OrdineApiService, OrderItemGroupApiService]
})
export class TabOrderItemComponent extends BaseTabComponent<IProduct> implements OnChanges {
    public theOrderItem!: FormArray;
    public orderItemList!: IOrderItem[] | undefined;
    public ordineList!: IOrdine[];
    public form: FormGroup = orderItemForm(this.formBuilder);
    public smartFormGroup: FormGroup = this.formBuilder.group({});
    public page: number = 0;
    public smartValidation: boolean = true;
    public totalElements: number = 0;

    constructor(
        private formBuilder: FormBuilder,
        private orderItemApiService: OrderItemApiService,

        private orderItemGroupApiService: OrderItemGroupApiService,
        public router: Router
    ) {
        super();
    }

    @Input() tab!: BzTabComponent;

    public ngOnChanges(changes: SimpleChanges) {
        this.manageTabChanges(changes);
        this.managePageStatusChanges(changes);
    }

    /**
     * Paginate table.
     *
     */
    public paginateTable(object: any): void {
        this.isInReadOnly();
        let options = fillOptions(this.pageStatus, object);
        this.orderItemApiService.getOrderItemByProduct(this.entity?.objectKey!, options).subscribe(
            (data: any) => {
                this.orderItemList = data.content;
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

    public paginate(object: any): void {
        if (this.isTabActive(this.tab, 'ORDER_ITEM') && this.isNotSamePage(this.page, object)) this.paginateTable(object);
    }

    public getSmartArray(smartArray: any): void {
        BzTableUtils.addSmartForm(this.formGroup, 'theOrderItem', smartArray, this.form, 'theProductObjectKey');
    }

    public getOrdineList(): void {
        if (!this.ordineList) {
            this.orderItemGroupApiService.ordine.getOrdineByCriteria().subscribe(data => {
                this.ordineList = getListForDropdowns(data);
            });
        }
    }

    private managePageStatusChanges(changes: SimpleChanges): void {
        const pageStatusChanges: SimpleChange = changes.pageStatus;
        if (pageStatusChanges?.currentValue) {
            if (isInViewMode(this.pageStatus)) {
                this.orderItemList = undefined;
            }
            this.isInReadOnly();
            this.getParentsList();
        }
    }

    private manageTabChanges(changes: SimpleChanges): void {
        const tabChanges: SimpleChange = changes.tab;
        const entityChanges: SimpleChange = changes.entity;
        const tab = this.setTabChanged(tabChanges, this.tab);
        const entity = this.setEntityChanged(entityChanges, this.entity);
        if (tab && entity) {
            this.tab = tab;
            this.entity = entity;
            const object: PageObject = { page: 0, pageSize: this.pageSize };
            if (this.isTabActive(this.tab, 'ORDER_ITEM') && !this.orderItemList) this.paginateTable(object);
        }
    }

    private getParentsList(): void {
        if (!isInViewMode(this.pageStatus)) {
            this.getOrdineList();
            //Add here more dropdown list options...
        }
    }

    public navigateToView(id: number): void {
        navigateToPath(ORDER_ITEM.PATH.DETAIL + id + this.PATH_VIEW, this.router);
    }

    private isInReadOnly(): void {
        if (this.readonly) {
            this.pageStatus = PageStatus.VIEW;
        }
    }
}
