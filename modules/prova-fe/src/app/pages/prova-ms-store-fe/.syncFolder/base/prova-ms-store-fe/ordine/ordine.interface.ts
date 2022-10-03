import { BaseEntity } from '../../../shared/base/base.interface';
import { IOrderItem } from '../order-item/order-item.interface';

export interface IOrdine extends BaseEntity {
    ordineId: number;
    date: Date;
    totalCost: number;
    address: string;
    theUtenteObjectKey: string;
    theUtenteObjectTitle: string;
    theOrderItem: IOrderItem[];
}
