import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { BzDialogService, BzSize, PaginationUtils } from '@micegroup/voila2-blazing-ng';
import { IUtente } from '../../utente/utente.interface';
import { UtenteApiService } from '../../utente/utente-api.service';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { ButtonService } from 'src/app/utilities/services/buttons.service';

const PROVIDERS = [UtenteApiService, ButtonService];

@Component({
    selector: 'app-dialog-list-utente',
    templateUrl: './dialog-list-utente.component.html',
    styleUrls: ['../../utente/utente.scss'],
    providers: [...PROVIDERS]
})
export class DialogListUtenteComponent extends BaseComponent {
    public utenteList: IUtente[] = [];
    public totalPages: number = 0;
    public spinner = true;
    public pageSize = 5;
    public cardSize = BzSize.LARGE;
    public page: number = 0;
    public totalElements: number = 0;

    constructor(private utenteApiService: UtenteApiService, public buttonsService: ButtonService, private dialogService: BzDialogService) {
        super();
    }

    public paginateTable(object: any, criteria?: any): void {
        const options: HttpParams = PaginationUtils.setOptionsForSpring(object, criteria);
        this.utenteApiService.getUtenteByCriteria(options).subscribe(
            (data: any) => {
                this.utenteList = data.content;
                this.totalPages = data.totalPages;
                this.page = data.number;
                this.totalElements = data.totalElements;
                this.spinner = false;
            },
            () => {
                this.spinner = false;
            }
        );
    }

    public selectElement(utente: IUtente): void {
        this.dialogService.closeDialog(utente);
    }
}
