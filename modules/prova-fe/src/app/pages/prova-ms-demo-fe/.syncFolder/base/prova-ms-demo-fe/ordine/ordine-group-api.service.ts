import { Injectable, Injector } from '@angular/core';
import { OrdineApiService } from './ordine-api.service';
import { UtenteApiService } from '../../prova-ms-demo-fe/utente/utente-api.service';

@Injectable()
export class OrdineGroupApiService {
    private ordineApiService!: OrdineApiService;
    private utenteApiService!: UtenteApiService;

    constructor(private injector: Injector) {}

    get ordine(): OrdineApiService {
        if (!this.ordineApiService) this.ordineApiService = this.injector.get(OrdineApiService);
        return this.ordineApiService;
    }

    get utente(): UtenteApiService {
        if (!this.utenteApiService) this.utenteApiService = this.injector.get(UtenteApiService);
        return this.utenteApiService;
    }
}
