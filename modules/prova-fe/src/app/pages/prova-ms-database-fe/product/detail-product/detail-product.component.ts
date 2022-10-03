import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ButtonService } from '../../../../utilities/services/buttons.service';
import { IProduct } from '../product.interface';
import { ProductApiService } from '../product-api.service';
import { ProductGroupApiService } from '../product-group-api.service';
import { productForm } from '../product-form';
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
import { PRODUCT } from '../product.constant';
import { findInvalidControlsRecursive } from 'src/app/utilities/function/helper';

import { TranslatePipe } from '@micegroup/voila2-translate-ng';
import { BzTableUtils, BzUtils } from '@micegroup/voila2-blazing-ng';

const PROVIDERS = [ProductApiService, ButtonService, OverlaysService, RouteService, ConfirmDialogService, ProductGroupApiService];

@Component({
    selector: 'app-detail-product',
    templateUrl: './detail-product.component.html',
    styleUrls: ['../product.scss'],
    providers: [...PROVIDERS]
})
export class DetailProductComponent extends BaseComponent implements OnInit {
    public productForm!: FormGroup;
    public product!: IProduct;
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
        private productGroupApiService: ProductGroupApiService
    ) {
        super();
    }

    ngOnInit(): void {
        this.productForm = productForm(this.formBuilder);
        this.routeService.route.data.subscribe((data: Data) => {
            this.pageStatus = data.pageSatus;
        });
        this.getProductById();
        this.setTabPageStatusOnInit();
        if (isInNewMode(this.pageStatus)) this.spinner = false;
    }

    public insertProduct(): void {
        BzUtils.triggerValidation('Product');

        if (this.productForm.invalid) {
            findInvalidControlsRecursive(this.productForm, true);
            return;
        }

        const product: IProduct = this.productForm.value;

        this.productGroupApiService.product.addProduct(product).subscribe((productResult: IProduct) => {
            this.product = productResult;
            if (this.product) {
                this.overlaysService.toast.showSuccess(this.MSG_INSERT, ['detail.Product.label', this.product.objectKey]);
                navigateToPath(PRODUCT.PATH.DETAIL + this.product.objectKey + this.PATH_VIEW, this.routeService.router);
            }
        });
    }

    public getProductById(): void {
        if (isInViewEditMode(this.pageStatus)) {
            const id = getIdFromPath(this.routeService.route);
            if (id) {
                this.productGroupApiService.product.getProductById(id).subscribe(
                    (productResult: IProduct) => {
                        this.product = productResult;
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
        this.productForm.patchValue({
            productId: this.product.productId,
            productName: this.product.productName,
            cost: this.product.cost,
            disponibility: this.product.disponibility,
            description: this.product.description,
            image: this.product.image
        });
    }

    public editProduct(): void {
        navigateToPath(PRODUCT.PATH.DETAIL + this.product.objectKey + this.PATH_EDIT, this.routeService.router);
    }

    public updateProduct(): void {
        BzUtils.triggerValidation('Product');

        const product: IProduct = this.productForm.value;

        if (this.productForm.invalid) {
            findInvalidControlsRecursive(this.productForm, true);
            return;
        }

        this.productGroupApiService.product.updateProduct(product).subscribe((productResult: IProduct) => {
            this.product = productResult;
            if (this.product) {
                this.overlaysService.toast.showSuccess(this.MSG_UPDATE, ['detail.Product.label', this.product.objectKey]);
                navigateToPath(PRODUCT.PATH.DETAIL + this.product.objectKey + this.PATH_VIEW, this.routeService.router);
            }
        });
    }

    /**
     * Delete product by id.
     */
    public deleteProductById(): void {
        this.productGroupApiService.product.deleteProduct(this.product.objectKey).subscribe(() => {
            this.overlaysService.toast.showSuccess(this.MSG_DELETE, ['detail.Product.label', this.product.objectKey]);
            navigateToPath(PRODUCT.PATH.LIST, this.routeService.router);
            this.overlaysService.dialog.closeDialog();
        });
    }

    /**
     * Confirm delete product.
     */
    public confirmDeleteProduct(): void {
        this.overlaysService.confirmDialog.openConfirmDialog(this.CONF_DELETE).subscribe((isTrue: boolean) => {
            if (isTrue) this.deleteProductById();
        });
    }
}
