import { BaseEntity } from '../../../shared/base/base.interface';
import { IOrdine } from '../ordine/ordine.interface';

export interface IUtente extends BaseEntity {
    utenteId: number;
    name: string;
    surname: string;
    email: string;
    oauthId: number;
    isAdmin: boolean;
    theOrdine: IOrdine[];
}
