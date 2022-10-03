import { BaseEntity } from '../../../shared/base/base.interface';
import { IOrdine } from '../ordine/ordine.interface';

export interface IUtente extends BaseEntity {
    utenteId: number;
    oauthId: number;
    name: string;
    surname: string;
    email: string;
    isAdmin: boolean;
    theOrdine: IOrdine[];
}
