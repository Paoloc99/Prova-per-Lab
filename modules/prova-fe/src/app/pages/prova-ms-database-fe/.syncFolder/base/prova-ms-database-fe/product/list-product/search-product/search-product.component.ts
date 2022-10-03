import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateService } from '@micegroup/voila2-blazing-ng';
import { ProductGroupApiService } from '../../product-group-api.service';
import {} from '@micegroup/voila2-runtime-ng';

import { SpringFilter, SpringFilterUtils } from 'spring-filter-ng';

const PROVIDERS = [ProductGroupApiService];
import { getTime, springFilterLocaleDate, springFilterLocaleDateTime } from '../../../../../utilities/function/helper';
import { getListForDropdowns } from 'src/app/shared/base/base.helper';

@Component({
    selector: 'app-search-product',
    templateUrl: './search-product.component.html',
    styleUrls: ['../../product.scss'],
    providers: [...PROVIDERS]
})
export class SearchProductComponent implements OnInit {
    public searchProductForm!: FormGroup;

    @Output() submit: EventEmitter<void> = new EventEmitter<void>();

    constructor(private formBuilder: FormBuilder, private dateService: DateService, private productGroupApiService: ProductGroupApiService) {}

    ngOnInit(): void {
        this.inizialize();
    }

    public search(): any {
        let filterBuild = new SpringFilter().build();
        const searchProduct = this.searchProductForm.value;

        if (searchProduct) {
            const productIdFrom = searchProduct.productIdFrom;
            if (productIdFrom) {
                filterBuild = SpringFilterUtils.addAND(filterBuild);
                filterBuild = filterBuild.greaterOrEqual('productId', productIdFrom);
            }
            const productIdTo = searchProduct.productIdTo;
            if (productIdTo) {
                filterBuild = SpringFilterUtils.addAND(filterBuild);
                filterBuild = filterBuild.smallerOrEqual('productId', productIdTo);
            }

            const productName = searchProduct.productName;
            if (productName) {
                filterBuild = SpringFilterUtils.addAND(filterBuild);
                filterBuild = filterBuild.like('productName', SpringFilterUtils.likeAll(productName));
            }

            const costFrom = searchProduct.costFrom;
            if (costFrom) {
                filterBuild = SpringFilterUtils.addAND(filterBuild);
                filterBuild = filterBuild.greaterOrEqual('cost', costFrom);
            }
            const costTo = searchProduct.costTo;
            if (costTo) {
                filterBuild = SpringFilterUtils.addAND(filterBuild);
                filterBuild = filterBuild.smallerOrEqual('cost', costTo);
            }

            const disponibilityFrom = searchProduct.disponibilityFrom;
            if (disponibilityFrom) {
                filterBuild = SpringFilterUtils.addAND(filterBuild);
                filterBuild = filterBuild.greaterOrEqual('disponibility', disponibilityFrom);
            }
            const disponibilityTo = searchProduct.disponibilityTo;
            if (disponibilityTo) {
                filterBuild = SpringFilterUtils.addAND(filterBuild);
                filterBuild = filterBuild.smallerOrEqual('disponibility', disponibilityTo);
            }

            const description = searchProduct.description;
            if (description) {
                filterBuild = SpringFilterUtils.addAND(filterBuild);
                filterBuild = filterBuild.like('description', SpringFilterUtils.likeAll(description));
            }

            const image = searchProduct.image;
            if (image) {
                filterBuild = SpringFilterUtils.addAND(filterBuild);
                filterBuild = filterBuild.like('image', SpringFilterUtils.likeAll(image));
            }
        }

        return filterBuild.value;
    }

    public submitForm() {
        this.submit.emit();
    }

    public inizialize(): void {
        this.searchProductForm = this.formBuilder.group({
            productIdFrom: [null],
            productIdTo: [null],
            productName: [null],
            costFrom: [null],
            costTo: [null],
            disponibilityFrom: [null],
            disponibilityTo: [null],
            description: [null],
            image: [null]
        });
    }
}
