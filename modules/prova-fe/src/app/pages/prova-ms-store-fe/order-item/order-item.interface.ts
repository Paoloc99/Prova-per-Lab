import { BaseEntity } from '../../../shared/base/base.interface';

export interface IOrderItem extends BaseEntity {
    ordineId: number;
    productId: number;
    amount: number;
    theOrdineObjectKey: string;
    theOrdineObjectTitle: string;
    theProductObjectKey: string;
    theProductObjectTitle: string;
}
