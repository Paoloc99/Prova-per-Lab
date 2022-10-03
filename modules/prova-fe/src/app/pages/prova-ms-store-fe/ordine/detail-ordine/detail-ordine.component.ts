import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ButtonService } from '../../../../utilities/services/buttons.service';
import { IOrdine } from '../ordine.interface';
import { OrdineApiService } from '../ordine-api.service';
import { OrdineGroupApiService } from '../ordine-group-api.service';
import { ordineForm } from '../ordine-form';
import { Location } from '@angular/common';
import { ToastrService } from '../../../../utilities/services/toastr.service';
import { RouteService } from '../../../../utilities/services/route.service';
import { ConfirmDialogService } from '../../../../utilities/dialog/confirm-dialog.service';
import { BaseComponent } from '../../../../shared/base/base.component';
import { PageStatus } from '../../../../utilities/enum/page-status.enum';
import { OverlaysService } from '../../../../utilities/services/overlays.service';
import { Data } from '@angular/router';
import { getIdFromPath, isInViewEditMode, navigateToPath, getPrivilegesEnum, getPrivileges, isInNewMode } from '@micegroup/voila2-runtime-ng';
import { getListForDropdowns } from 'src/app/shared/base/base.helper';
import { ORDINE } from '../ordine.constant';
import { findInvalidControlsRecursive } from 'src/app/utilities/function/helper';

import { IUtente } from '../../../prova-ms-store-fe/utente/utente.interface';
import { UtenteApiService } from '../../../prova-ms-store-fe/utente/utente-api.service';
import { TranslatePipe } from '@micegroup/voila2-translate-ng';
import { BzTableUtils, BzUtils } from '@micegroup/voila2-blazing-ng';

const PROVIDERS = [OrdineApiService, ButtonService, OverlaysService, RouteService, ConfirmDialogService, OrdineGroupApiService, UtenteApiService];

@Component({
    selector: 'app-detail-ordine',
    templateUrl: './detail-ordine.component.html',
    styleUrls: ['../ordine.scss'],
    providers: [...PROVIDERS]
})
export class DetailOrdineComponent extends BaseComponent implements OnInit {
    public ordineForm!: FormGroup;
    public ordine!: IOrdine;
    public utenteList: IUtente[] = [];
    public spinner: boolean = true;
    public smartValidation: boolean = true;

    public privileges: string[] = getPrivileges();

    public get Privileges(): any {
        return getPrivilegesEnum();
    }

    constructor(
        public buttonsService: ButtonService,
        private formBuilder: FormBuilder,
        private routeService: RouteService,
        private overlaysService: OverlaysService,
        private ordineGroupApiService: OrdineGroupApiService
    ) {
        super();
    }

    ngOnInit(): void {
        this.ordineForm = ordineForm(this.formBuilder);
        this.routeService.route.data.subscribe((data: Data) => {
            this.pageStatus = data.pageSatus;
        });
        this.getOrdineById();
        this.setTabPageStatusOnInit();
        this.getParentsList();
        if (isInNewMode(this.pageStatus)) this.spinner = false;
    }

    public insertOrdine(): void {
        BzUtils.triggerValidation('Ordine');

        if (this.ordineForm.invalid) {
            findInvalidControlsRecursive(this.ordineForm, true);
            return;
        }

        const ordine: IOrdine = this.ordineForm.value;

        this.ordineGroupApiService.ordine.addOrdine(ordine).subscribe((ordineResult: IOrdine) => {
            this.ordine = ordineResult;
            if (this.ordine) {
                this.overlaysService.toast.showSuccess(this.MSG_INSERT, ['detail.Ordine.label', this.ordine.objectKey]);
                navigateToPath(ORDINE.PATH.DETAIL + this.ordine.objectKey + this.PATH_VIEW, this.routeService.router);
            }
        });
    }

    public getOrdineById(): void {
        if (isInViewEditMode(this.pageStatus)) {
            const id = getIdFromPath(this.routeService.route);
            if (id) {
                this.ordineGroupApiService.ordine.getOrdineById(id).subscribe(
                    (ordineResult: IOrdine) => {
                        this.ordine = ordineResult;
                        this.setTabPageStatus(this.pageStatus);
                        this.fillForm();
                        this.spinner = false;
                    },
                    () => {
                        this.spinner = false;
                    }
                );
            }
        }
    }

    public fillForm(): void {
        this.ordineForm.patchValue({
            ordineId: this.ordine.ordineId,
            date: this.ordine.date,
            totalCost: this.ordine.totalCost,
            address: this.ordine.address,
            theUtenteObjectKey: this.ordine.theUtenteObjectKey
        });
    }

    public editOrdine(): void {
        navigateToPath(ORDINE.PATH.DETAIL + this.ordine.objectKey + this.PATH_EDIT, this.routeService.router);
    }

    public updateOrdine(): void {
        BzUtils.triggerValidation('Ordine');

        const ordine: IOrdine = this.ordineForm.value;

        if (this.ordineForm.invalid) {
            findInvalidControlsRecursive(this.ordineForm, true);
            return;
        }

        this.ordineGroupApiService.ordine.updateOrdine(ordine).subscribe((ordineResult: IOrdine) => {
            this.ordine = ordineResult;
            if (this.ordine) {
                this.overlaysService.toast.showSuccess(this.MSG_UPDATE, ['detail.Ordine.label', this.ordine.objectKey]);
                navigateToPath(ORDINE.PATH.DETAIL + this.ordine.objectKey + this.PATH_VIEW, this.routeService.router);
            }
        });
    }

    /**
     * Delete ordine by id.
     */
    public deleteOrdineById(): void {
        this.ordineGroupApiService.ordine.deleteOrdine(this.ordine.objectKey).subscribe(() => {
            this.overlaysService.toast.showSuccess(this.MSG_DELETE, ['detail.Ordine.label', this.ordine.objectKey]);
            navigateToPath(ORDINE.PATH.LIST, this.routeService.router);
            this.overlaysService.dialog.closeDialog();
        });
    }

    /**
     * Confirm delete ordine.
     */
    public confirmDeleteOrdine(): void {
        this.overlaysService.confirmDialog.openConfirmDialog(this.CONF_DELETE).subscribe((isTrue: boolean) => {
            if (isTrue) this.deleteOrdineById();
        });
    }

    public getUtenteList(): void {
        this.ordineGroupApiService.utente.getUtenteByCriteria().subscribe(data => {
            this.utenteList = getListForDropdowns(data);
        });
    }

    private getParentsList(): void {
        this.getUtenteList();
    }
}
