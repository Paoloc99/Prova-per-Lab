import { BaseEntity } from '../../../shared/base/base.interface';
import { IOrderItem } from '../order-item/order-item.interface';

export interface IProduct extends BaseEntity {
    productId: number;
    theOrderItem: IOrderItem[];
}
