import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { BzDialogService, BzSize, PaginationUtils } from '@micegroup/voila2-blazing-ng';
import { IOrdine } from '../../ordine/ordine.interface';
import { OrdineApiService } from '../../ordine/ordine-api.service';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { ButtonService } from 'src/app/utilities/services/buttons.service';

const PROVIDERS = [OrdineApiService, ButtonService];

@Component({
    selector: 'app-dialog-list-ordine',
    templateUrl: './dialog-list-ordine.component.html',
    styleUrls: ['../../ordine/ordine.scss'],
    providers: [...PROVIDERS]
})
export class DialogListOrdineComponent extends BaseComponent {
    public ordineList: IOrdine[] = [];
    public totalPages: number = 0;
    public spinner = true;
    public pageSize = 5;
    public cardSize = BzSize.LARGE;
    public page: number = 0;
    public totalElements: number = 0;

    constructor(private ordineApiService: OrdineApiService, public buttonsService: ButtonService, private dialogService: BzDialogService) {
        super();
    }

    public paginateTable(object: any, criteria?: any): void {
        const options: HttpParams = PaginationUtils.setOptionsForSpring(object, criteria);
        this.ordineApiService.getOrdineByCriteria(options).subscribe(
            (data: any) => {
                this.ordineList = data.content;
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

    public selectElement(ordine: IOrdine): void {
        this.dialogService.closeDialog(ordine);
    }
}
