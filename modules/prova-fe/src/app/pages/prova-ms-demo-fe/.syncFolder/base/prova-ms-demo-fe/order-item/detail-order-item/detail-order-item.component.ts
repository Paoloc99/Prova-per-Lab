import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ButtonService } from '../../../../utilities/services/buttons.service';
import { IOrderItem } from '../order-item.interface';
import { OrderItemApiService } from '../order-item-api.service';
import { OrderItemGroupApiService } from '../order-item-group-api.service';
import { orderItemForm } from '../order-item-form';
import { Location } from '@angular/common';
import { ToastrService } from '../../../../utilities/services/toastr.service';
import { RouteService } from '../../../../utilities/services/route.service';
import { ConfirmDialogService } from '../../../../utilities/dialog/confirm-dialog.service';
import { BaseComponent } from '../../../../shared/base/base.component';
import { PageStatus } from '../../../../utilities/enum/page-status.enum';
import { OverlaysService } from '../../../../utilities/services/overlays.service';
import { Data } from '@angular/router';
import { getIdFromPath, isInViewEditMode, navigateToPath, getPrivilegesEnum, getPrivileges, isInNewMode } from '@micegroup/voila2-runtime-ng';
import { getListForDropdowns } from 'src/app/shared/base/base.helper';
import { ORDER_ITEM } from '../order-item.constant';
import { findInvalidControlsRecursive } from 'src/app/utilities/function/helper';

import { IOrdine } from '../../../prova-ms-demo-fe/ordine/ordine.interface';
import { OrdineApiService } from '../../../prova-ms-demo-fe/ordine/ordine-api.service';
import { IProduct } from '../../../prova-ms-demo-fe/product/product.interface';
import { ProductApiService } from '../../../prova-ms-demo-fe/product/product-api.service';
import { TranslatePipe } from '@micegroup/voila2-translate-ng';
import { BzTableUtils, BzUtils } from '@micegroup/voila2-blazing-ng';

const PROVIDERS = [OrderItemApiService, ButtonService, OverlaysService, RouteService, ConfirmDialogService, OrderItemGroupApiService, OrdineApiService, ProductApiService];

@Component({
    selector: 'app-detail-order-item',
    templateUrl: './detail-order-item.component.html',
    styleUrls: ['../order-item.scss'],
    providers: [...PROVIDERS]
})
export class DetailOrderItemComponent extends BaseComponent implements OnInit {
    public orderItemForm!: FormGroup;
    public orderItem!: IOrderItem;
    public ordineList: IOrdine[] = [];
    public productList: IProduct[] = [];
    public spinner: boolean = true;
    public smartValidation: boolean = true;

    public privileges: string[] = getPrivileges();

    public get Privileges(): any {
        return getPrivilegesEnum();
    }

    constructor(
        public buttonsService: ButtonService,
        private formBuilder: FormBuilder,
        private routeService: RouteService,
        private overlaysService: OverlaysService,
        private orderItemGroupApiService: OrderItemGroupApiService
    ) {
        super();
    }

    ngOnInit(): void {
        this.orderItemForm = orderItemForm(this.formBuilder);
        this.routeService.route.data.subscribe((data: Data) => {
            this.pageStatus = data.pageSatus;
        });
        this.getOrderItemById();
        this.setTabPageStatusOnInit();
        this.getParentsList();
        if (isInNewMode(this.pageStatus)) this.spinner = false;
    }

    public insertOrderItem(): void {
        BzUtils.triggerValidation('OrderItem');

        if (this.orderItemForm.invalid) {
            findInvalidControlsRecursive(this.orderItemForm, true);
            return;
        }

        const orderItem: IOrderItem = this.orderItemForm.value;

        this.orderItemGroupApiService.orderItem.addOrderItem(orderItem).subscribe((orderItemResult: IOrderItem) => {
            this.orderItem = orderItemResult;
            if (this.orderItem) {
                this.overlaysService.toast.showSuccess(this.MSG_INSERT, ['detail.OrderItem.label', this.orderItem.objectKey]);
                navigateToPath(ORDER_ITEM.PATH.DETAIL + this.orderItem.objectKey + this.PATH_VIEW, this.routeService.router);
            }
        });
    }

    public getOrderItemById(): void {
        if (isInViewEditMode(this.pageStatus)) {
            const id = getIdFromPath(this.routeService.route);
            if (id) {
                this.orderItemGroupApiService.orderItem.getOrderItemById(id).subscribe(
                    (orderItemResult: IOrderItem) => {
                        this.orderItem = orderItemResult;
                        this.setTabPageStatus(this.pageStatus);
                        this.fillForm();
                        this.spinner = false;
                    },
                    () => {
                        this.spinner = false;
                    }
                );
            }
        }
    }

    public fillForm(): void {
        this.orderItemForm.patchValue({
            ordineId: this.orderItem.ordineId,
            theOrdineObjectKey: this.orderItem.theOrdineObjectKey,
            productId: this.orderItem.productId,
            theProductObjectKey: this.orderItem.theProductObjectKey,
            amount: this.orderItem.amount
        });
    }

    public editOrderItem(): void {
        navigateToPath(ORDER_ITEM.PATH.DETAIL + this.orderItem.objectKey + this.PATH_EDIT, this.routeService.router);
    }

    public updateOrderItem(): void {
        BzUtils.triggerValidation('OrderItem');

        const orderItem: IOrderItem = this.orderItemForm.value;

        if (this.orderItemForm.invalid) {
            findInvalidControlsRecursive(this.orderItemForm, true);
            return;
        }

        this.orderItemGroupApiService.orderItem.updateOrderItem(orderItem).subscribe((orderItemResult: IOrderItem) => {
            this.orderItem = orderItemResult;
            if (this.orderItem) {
                this.overlaysService.toast.showSuccess(this.MSG_UPDATE, ['detail.OrderItem.label', this.orderItem.objectKey]);
                navigateToPath(ORDER_ITEM.PATH.DETAIL + this.orderItem.objectKey + this.PATH_VIEW, this.routeService.router);
            }
        });
    }

    /**
     * Delete orderItem by id.
     */
    public deleteOrderItemById(): void {
        this.orderItemGroupApiService.orderItem.deleteOrderItem(this.orderItem.objectKey).subscribe(() => {
            this.overlaysService.toast.showSuccess(this.MSG_DELETE, ['detail.OrderItem.label', this.orderItem.objectKey]);
            navigateToPath(ORDER_ITEM.PATH.LIST, this.routeService.router);
            this.overlaysService.dialog.closeDialog();
        });
    }

    /**
     * Confirm delete orderItem.
     */
    public confirmDeleteOrderItem(): void {
        this.overlaysService.confirmDialog.openConfirmDialog(this.CONF_DELETE).subscribe((isTrue: boolean) => {
            if (isTrue) this.deleteOrderItemById();
        });
    }

    public getOrdineList(): void {
        this.orderItemGroupApiService.ordine.getOrdineByCriteria().subscribe(data => {
            this.ordineList = getListForDropdowns(data);
        });
    }
    public getProductList(): void {
        this.orderItemGroupApiService.product.getProductByCriteria().subscribe(data => {
            this.productList = getListForDropdowns(data);
        });
    }

    private getParentsList(): void {
        this.getOrdineList();
        this.getProductList();
    }
}
