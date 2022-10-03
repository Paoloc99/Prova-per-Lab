import { HttpParams } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { PageObject, PaginationUtils } from '@micegroup/voila2-blazing-ng';
import { BaseComponent } from '../../../../shared/base/base.component';
import { IUtente } from '../utente.interface';
import { UtenteApiService } from '../utente-api.service';
import { ButtonService } from '../../../../utilities/services/buttons.service';
import { SearchUtenteComponent } from './search-utente/search-utente.component';
import { Router } from '@angular/router';
import { navigateToPath, getPrivilegesEnum, getPrivileges, ApiResponse, extractTotalElements } from '@micegroup/voila2-runtime-ng';
import { setOptions } from 'src/app/utilities/function/helper';
import { UTENTE } from '../utente.constant';

@Component({
    selector: 'app-list-utente',
    templateUrl: './list-utente.component.html',
    styleUrls: ['../utente.scss'],
    providers: [UtenteApiService, ButtonService]
})
export class ListUtenteComponent extends BaseComponent {
    public utenteList: IUtente[] = [];
    public utente!: IUtente;
    public totalPages: number = 0;
    public spinner: boolean = true;
    public utenteCriteria!: any;
    public pageSize: number = 5;
    public page: number = 0;
    public totalElements: number = 0;

    public privileges: string[] = getPrivileges();

    public get Privileges(): any {
        return getPrivilegesEnum();
    }

    @ViewChild(SearchUtenteComponent) searchUtente!: SearchUtenteComponent;

    constructor(private utenteApiService: UtenteApiService, public router: Router) {
        super();
    }

    public paginateTable(pageObject: PageObject, filter?: string): void {
        const options: HttpParams = setOptions(pageObject, filter);
        this.utenteApiService.getUtenteByCriteria(options).subscribe(
            (data: any) => {
                this.utenteList = data.content;
                this.totalPages = data.totalPages;
                this.totalElements = data.totalElements;
                this.page = data.number;
                this.spinner = false;
            },
            () => {
                this.spinner = false;
            }
        );
    }

    public searchWithCriteria(): void {
        this.utenteCriteria = this.searchUtente.search();
        const object: PageObject = { page: 0, pageSize: this.pageSize };
        this.paginateTable(object, this.utenteCriteria);
    }

    public navigateToView(id: number): void {
        navigateToPath(UTENTE.PATH.DETAIL + id + this.PATH_VIEW, this.router);
    }
}
