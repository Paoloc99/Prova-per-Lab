import { Injectable, Injector } from '@angular/core';
import { UtenteApiService } from './utente-api.service';

@Injectable()
export class UtenteGroupApiService {
    private utenteApiService!: UtenteApiService;

    constructor(private injector: Injector) {}

    get utente(): UtenteApiService {
        if (!this.utenteApiService) this.utenteApiService = this.injector.get(UtenteApiService);
        return this.utenteApiService;
    }
}
