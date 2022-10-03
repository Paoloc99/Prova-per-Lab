import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ButtonService } from '../../../../utilities/services/buttons.service';
import { IUtente } from '../utente.interface';
import { UtenteApiService } from '../utente-api.service';
import { UtenteGroupApiService } from '../utente-group-api.service';
import { utenteForm } from '../utente-form';
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
import { UTENTE } from '../utente.constant';
import { findInvalidControlsRecursive } from 'src/app/utilities/function/helper';

import { TranslatePipe } from '@micegroup/voila2-translate-ng';
import { BzTableUtils, BzUtils } from '@micegroup/voila2-blazing-ng';

const PROVIDERS = [UtenteApiService, ButtonService, OverlaysService, RouteService, ConfirmDialogService, UtenteGroupApiService];

@Component({
    selector: 'app-detail-utente',
    templateUrl: './detail-utente.component.html',
    styleUrls: ['../utente.scss'],
    providers: [...PROVIDERS]
})
export class DetailUtenteComponent extends BaseComponent implements OnInit {
    public utenteForm!: FormGroup;
    public utente!: IUtente;
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
        private utenteGroupApiService: UtenteGroupApiService
    ) {
        super();
    }

    ngOnInit(): void {
        this.utenteForm = utenteForm(this.formBuilder);
        this.routeService.route.data.subscribe((data: Data) => {
            this.pageStatus = data.pageSatus;
        });
        this.getUtenteById();
        this.setTabPageStatusOnInit();
        if (isInNewMode(this.pageStatus)) this.spinner = false;
    }

    public insertUtente(): void {
        BzUtils.triggerValidation('Utente');

        if (this.utenteForm.invalid) {
            findInvalidControlsRecursive(this.utenteForm, true);
            return;
        }

        const utente: IUtente = this.utenteForm.value;

        this.utenteGroupApiService.utente.addUtente(utente).subscribe((utenteResult: IUtente) => {
            this.utente = utenteResult;
            if (this.utente) {
                this.overlaysService.toast.showSuccess(this.MSG_INSERT, ['detail.Utente.label', this.utente.objectKey]);
                navigateToPath(UTENTE.PATH.DETAIL + this.utente.objectKey + this.PATH_VIEW, this.routeService.router);
            }
        });
    }

    public getUtenteById(): void {
        if (isInViewEditMode(this.pageStatus)) {
            const id = getIdFromPath(this.routeService.route);
            if (id) {
                this.utenteGroupApiService.utente.getUtenteById(id).subscribe(
                    (utenteResult: IUtente) => {
                        this.utente = utenteResult;
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
        this.utenteForm.patchValue({
            utenteId: this.utente.utenteId,
            oauthId: this.utente.oauthId,
            name: this.utente.name,
            surname: this.utente.surname,
            email: this.utente.email,
            isAdmin: this.utente.isAdmin
        });
    }

    public editUtente(): void {
        navigateToPath(UTENTE.PATH.DETAIL + this.utente.objectKey + this.PATH_EDIT, this.routeService.router);
    }

    public updateUtente(): void {
        BzUtils.triggerValidation('Utente');

        const utente: IUtente = this.utenteForm.value;

        if (this.utenteForm.invalid) {
            findInvalidControlsRecursive(this.utenteForm, true);
            return;
        }

        this.utenteGroupApiService.utente.updateUtente(utente).subscribe((utenteResult: IUtente) => {
            this.utente = utenteResult;
            if (this.utente) {
                this.overlaysService.toast.showSuccess(this.MSG_UPDATE, ['detail.Utente.label', this.utente.objectKey]);
                navigateToPath(UTENTE.PATH.DETAIL + this.utente.objectKey + this.PATH_VIEW, this.routeService.router);
            }
        });
    }

    /**
     * Delete utente by id.
     */
    public deleteUtenteById(): void {
        this.utenteGroupApiService.utente.deleteUtente(this.utente.objectKey).subscribe(() => {
            this.overlaysService.toast.showSuccess(this.MSG_DELETE, ['detail.Utente.label', this.utente.objectKey]);
            navigateToPath(UTENTE.PATH.LIST, this.routeService.router);
            this.overlaysService.dialog.closeDialog();
        });
    }

    /**
     * Confirm delete utente.
     */
    public confirmDeleteUtente(): void {
        this.overlaysService.confirmDialog.openConfirmDialog(this.CONF_DELETE).subscribe((isTrue: boolean) => {
            if (isTrue) this.deleteUtenteById();
        });
    }
}
