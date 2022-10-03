import { HttpParams } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { PageObject, PaginationUtils } from '@micegroup/voila2-blazing-ng';
import { BaseComponent } from '../../../../shared/base/base.component';
import { IOrdine } from '../ordine.interface';
import { OrdineApiService } from '../ordine-api.service';
import { ButtonService } from '../../../../utilities/services/buttons.service';
import { SearchOrdineComponent } from './search-ordine/search-ordine.component';
import { Router } from '@angular/router';
import { navigateToPath, getPrivilegesEnum, getPrivileges, ApiResponse, extractTotalElements } from '@micegroup/voila2-runtime-ng';
import { setOptions } from 'src/app/utilities/function/helper';
import { ORDINE } from '../ordine.constant';

@Component({
    selector: 'app-list-ordine',
    templateUrl: './list-ordine.component.html',
    styleUrls: ['../ordine.scss'],
    providers: [OrdineApiService, ButtonService]
})
export class ListOrdineComponent extends BaseComponent {
    public ordineList: IOrdine[] = [];
    public ordine!: IOrdine;
    public totalPages: number = 0;
    public spinner: boolean = true;
    public ordineCriteria!: any;
    public pageSize: number = 5;
    public page: number = 0;
    public totalElements: number = 0;

    public privileges: string[] = getPrivileges();

    public get Privileges(): any {
        return getPrivilegesEnum();
    }

    @ViewChild(SearchOrdineComponent) searchOrdine!: SearchOrdineComponent;

    constructor(private ordineApiService: OrdineApiService, public router: Router) {
        super();
    }

    public paginateTable(pageObject: PageObject, filter?: string): void {
        const options: HttpParams = setOptions(pageObject, filter);
        this.ordineApiService.getOrdineByCriteria(options).subscribe(
            (data: any) => {
                this.ordineList = data.content;
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
        this.ordineCriteria = this.searchOrdine.search();
        const object: PageObject = { page: 0, pageSize: this.pageSize };
        this.paginateTable(object, this.ordineCriteria);
    }

    public navigateToView(id: number): void {
        navigateToPath(ORDINE.PATH.DETAIL + id + this.PATH_VIEW, this.router);
    }
}
