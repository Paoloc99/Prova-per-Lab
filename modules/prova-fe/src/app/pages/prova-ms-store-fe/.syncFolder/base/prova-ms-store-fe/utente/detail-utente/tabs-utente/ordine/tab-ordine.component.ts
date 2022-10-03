import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PageObject, BzTableUtils, BzTabComponent } from '@micegroup/voila2-blazing-ng';
import { OrdineApiService } from 'src/app/pages/prova-ms-store-fe/ordine/ordine-api.service';
import { ordineForm } from 'src/app/pages/prova-ms-store-fe/ordine/ordine-form';
import { IOrdine } from 'src/app/pages/prova-ms-store-fe/ordine/ordine.interface';
import { OrdineGroupApiService } from 'src/app/pages/prova-ms-store-fe/ordine/ordine-group-api.service';
import { BaseTabComponent } from 'src/app/shared/base/base-tab.component';
import { fillOptions, getListForDropdowns } from 'src/app/shared/base/base.helper';
import { navigateToPath, isInViewMode, PageStatus } from '@micegroup/voila2-runtime-ng';
import { IUtente } from '../../../utente.interface';
import { ORDINE } from 'src/app/pages/prova-ms-store-fe/ordine/ordine.constant';

@Component({
    selector: 'app-tab-ordine',
    templateUrl: './tab-ordine.component.html',
    styleUrls: ['../../../utente.scss'],
    providers: [OrdineApiService, OrdineGroupApiService]
})
export class TabOrdineComponent extends BaseTabComponent<IUtente> implements OnChanges {
    public theOrdine!: FormArray;
    public ordineList!: IOrdine[] | undefined;
    public form: FormGroup = ordineForm(this.formBuilder);
    public smartFormGroup: FormGroup = this.formBuilder.group({});
    public page: number = 0;
    public smartValidation: boolean = true;
    public totalElements: number = 0;

    constructor(
        private formBuilder: FormBuilder,
        private ordineApiService: OrdineApiService,

        private ordineGroupApiService: OrdineGroupApiService,
        public router: Router
    ) {
        super();
    }

    @Input() tab!: BzTabComponent;

    public ngOnChanges(changes: SimpleChanges) {
        this.manageTabChanges(changes);
        this.managePageStatusChanges(changes);
    }

    /**
     * Paginate table.
     *
     */
    public paginateTable(object: any): void {
        this.isInReadOnly();
        let options = fillOptions(this.pageStatus, object);
        this.ordineApiService.getOrdineByUtente(this.entity?.objectKey!, options).subscribe(
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

    public paginate(object: any): void {
        if (this.isTabActive(this.tab, 'ORDINE') && this.isNotSamePage(this.page, object)) this.paginateTable(object);
    }

    public getSmartArray(smartArray: any): void {
        BzTableUtils.addSmartForm(this.formGroup, 'theOrdine', smartArray, this.form, '');
    }

    private managePageStatusChanges(changes: SimpleChanges): void {
        const pageStatusChanges: SimpleChange = changes.pageStatus;
        if (pageStatusChanges?.currentValue) {
            if (isInViewMode(this.pageStatus)) {
                this.ordineList = undefined;
            }
            this.isInReadOnly();
            this.getParentsList();
        }
    }

    private manageTabChanges(changes: SimpleChanges): void {
        const tabChanges: SimpleChange = changes.tab;
        const entityChanges: SimpleChange = changes.entity;
        const tab = this.setTabChanged(tabChanges, this.tab);
        const entity = this.setEntityChanged(entityChanges, this.entity);
        if (tab && entity) {
            this.tab = tab;
            this.entity = entity;
            const object: PageObject = { page: 0, pageSize: this.pageSize };
            if (this.isTabActive(this.tab, 'ORDINE') && !this.ordineList) this.paginateTable(object);
        }
    }

    private getParentsList(): void {
        if (!isInViewMode(this.pageStatus)) {
            //Add here more dropdown list options...
        }
    }

    public navigateToView(id: number): void {
        navigateToPath(ORDINE.PATH.DETAIL + id + this.PATH_VIEW, this.router);
    }

    private isInReadOnly(): void {
        if (this.readonly) {
            this.pageStatus = PageStatus.VIEW;
        }
    }
}
