import { BaseEntity } from '../../../shared/base/base.interface';

export interface IProduct extends BaseEntity {
    productId: number;
    productName: string;
    cost: number;
    disponibility: number;
    description: string;
    image: string;
}
