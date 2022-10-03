import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateService } from '@micegroup/voila2-blazing-ng';
import { ProductGroupApiService } from '../../product-group-api.service';
import { StringFilter } from '@micegroup/voila2-runtime-ng';

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
        }

        return filterBuild.value;
    }

    public submitForm() {
        this.submit.emit();
    }

    public inizialize(): void {
        this.searchProductForm = this.formBuilder.group({
            productIdFrom: [null],
            productIdTo: [null]
        });
    }
}
