import { Injectable, Injector } from '@angular/core';
import { OrderItemApiService } from './order-item-api.service';
import { OrdineApiService } from '../../prova-ms-store-fe/ordine/ordine-api.service';
import { ProductApiService } from '../../prova-ms-store-fe/product/product-api.service';

@Injectable()
export class OrderItemGroupApiService {
    private orderItemApiService!: OrderItemApiService;
    private ordineApiService!: OrdineApiService;
    private productApiService!: ProductApiService;

    constructor(private injector: Injector) {}

    get orderItem(): OrderItemApiService {
        if (!this.orderItemApiService) this.orderItemApiService = this.injector.get(OrderItemApiService);
        return this.orderItemApiService;
    }

    get ordine(): OrdineApiService {
        if (!this.ordineApiService) this.ordineApiService = this.injector.get(OrdineApiService);
        return this.ordineApiService;
    }

    get product(): ProductApiService {
        if (!this.productApiService) this.productApiService = this.injector.get(ProductApiService);
        return this.productApiService;
    }
}
