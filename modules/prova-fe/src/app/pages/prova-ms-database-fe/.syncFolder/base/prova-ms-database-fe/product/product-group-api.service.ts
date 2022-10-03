import { Injectable, Injector } from '@angular/core';
import { ProductApiService } from './product-api.service';

@Injectable()
export class ProductGroupApiService {
    private productApiService!: ProductApiService;

    constructor(private injector: Injector) {}

    get product(): ProductApiService {
        if (!this.productApiService) this.productApiService = this.injector.get(ProductApiService);
        return this.productApiService;
    }
}
