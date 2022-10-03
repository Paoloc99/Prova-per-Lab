import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateService } from '@micegroup/voila2-blazing-ng';
import { OrderItemGroupApiService } from '../../order-item-group-api.service';
import { StringFilter } from '@micegroup/voila2-runtime-ng';

import { SpringFilter, SpringFilterUtils } from 'spring-filter-ng';
import { IOrdine } from '../../../ordine/ordine.interface';
import { OrdineApiService } from '../../../ordine/ordine-api.service';
import { IProduct } from '../../../product/product.interface';
import { ProductApiService } from '../../../product/product-api.service';

const PROVIDERS = [OrderItemGroupApiService, OrdineApiService, ProductApiService];
import { getTime, springFilterLocaleDate, springFilterLocaleDateTime } from '../../../../../utilities/function/helper';
import { getListForDropdowns } from 'src/app/shared/base/base.helper';

@Component({
    selector: 'app-search-order-item',
    templateUrl: './search-order-item.component.html',
    styleUrls: ['../../order-item.scss'],
    providers: [...PROVIDERS]
})
export class SearchOrderItemComponent implements OnInit {
    public searchOrderItemForm!: FormGroup;
    public ordineList: IOrdine[] = [];
    public productList: IProduct[] = [];

    @Output() submit: EventEmitter<void> = new EventEmitter<void>();

    constructor(private formBuilder: FormBuilder, private dateService: DateService, private orderItemGroupApiService: OrderItemGroupApiService) {}

    ngOnInit(): void {
        this.inizialize();
        this.getParentsList();
    }

    public search(): any {
        let filterBuild = new SpringFilter().build();
        const searchOrderItem = this.searchOrderItemForm.value;

        if (searchOrderItem) {
            const amountFrom = searchOrderItem.amountFrom;
            if (amountFrom) {
                filterBuild = SpringFilterUtils.addAND(filterBuild);
                filterBuild = filterBuild.greaterOrEqual('amount', amountFrom);
            }
            const amountTo = searchOrderItem.amountTo;
            if (amountTo) {
                filterBuild = SpringFilterUtils.addAND(filterBuild);
                filterBuild = filterBuild.smallerOrEqual('amount', amountTo);
            }

            const theOrdineObjectKey = searchOrderItem.theOrdineObjectKey;
            // theOrdineObjectKey
            if (theOrdineObjectKey) {
                filterBuild = SpringFilterUtils.addAND(filterBuild);
                filterBuild = filterBuild.equals('theOrdine.ordineId', theOrdineObjectKey);
            }
            const theProductObjectKey = searchOrderItem.theProductObjectKey;
            // theProductObjectKey
            if (theProductObjectKey) {
                filterBuild = SpringFilterUtils.addAND(filterBuild);
                filterBuild = filterBuild.equals('theProduct.productId', theProductObjectKey);
            }
        }

        return filterBuild.value;
    }

    public submitForm() {
        this.submit.emit();
    }

    public inizialize(): void {
        this.searchOrderItemForm = this.formBuilder.group({
            amountFrom: [null],
            amountTo: [null],
            theOrdineObjectKey: [null],
            theProductObjectKey: [null]
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
