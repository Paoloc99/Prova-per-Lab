import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateService } from '@micegroup/voila2-blazing-ng';
import { UtenteGroupApiService } from '../../utente-group-api.service';
import {} from '@micegroup/voila2-runtime-ng';

import { SpringFilter, SpringFilterUtils } from 'spring-filter-ng';

const PROVIDERS = [UtenteGroupApiService];
import { getTime, springFilterLocaleDate, springFilterLocaleDateTime } from '../../../../../utilities/function/helper';
import { getListForDropdowns } from 'src/app/shared/base/base.helper';

@Component({
    selector: 'app-search-utente',
    templateUrl: './search-utente.component.html',
    styleUrls: ['../../utente.scss'],
    providers: [...PROVIDERS]
})
export class SearchUtenteComponent implements OnInit {
    public searchUtenteForm!: FormGroup;

    @Output() submit: EventEmitter<void> = new EventEmitter<void>();

    constructor(private formBuilder: FormBuilder, private dateService: DateService, private utenteGroupApiService: UtenteGroupApiService) {}

    ngOnInit(): void {
        this.inizialize();
    }

    public search(): any {
        let filterBuild = new SpringFilter().build();
        const searchUtente = this.searchUtenteForm.value;

        if (searchUtente) {
            const utenteIdFrom = searchUtente.utenteIdFrom;
            if (utenteIdFrom) {
                filterBuild = SpringFilterUtils.addAND(filterBuild);
                filterBuild = filterBuild.greaterOrEqual('utenteId', utenteIdFrom);
            }
            const utenteIdTo = searchUtente.utenteIdTo;
            if (utenteIdTo) {
                filterBuild = SpringFilterUtils.addAND(filterBuild);
                filterBuild = filterBuild.smallerOrEqual('utenteId', utenteIdTo);
            }

            const oauthIdFrom = searchUtente.oauthIdFrom;
            if (oauthIdFrom) {
                filterBuild = SpringFilterUtils.addAND(filterBuild);
                filterBuild = filterBuild.greaterOrEqual('oauthId', oauthIdFrom);
            }
            const oauthIdTo = searchUtente.oauthIdTo;
            if (oauthIdTo) {
                filterBuild = SpringFilterUtils.addAND(filterBuild);
                filterBuild = filterBuild.smallerOrEqual('oauthId', oauthIdTo);
            }

            const name = searchUtente.name;
            if (name) {
                filterBuild = SpringFilterUtils.addAND(filterBuild);
                filterBuild = filterBuild.like('name', SpringFilterUtils.likeAll(name));
            }

            const surname = searchUtente.surname;
            if (surname) {
                filterBuild = SpringFilterUtils.addAND(filterBuild);
                filterBuild = filterBuild.like('surname', SpringFilterUtils.likeAll(surname));
            }

            const email = searchUtente.email;
            if (email) {
                filterBuild = SpringFilterUtils.addAND(filterBuild);
                filterBuild = filterBuild.like('email', SpringFilterUtils.likeAll(email));
            }

            const isAdmin = searchUtente.isAdmin;
            if (isAdmin !== null) {
                filterBuild = SpringFilterUtils.addAND(filterBuild);
                filterBuild = filterBuild.like('isAdmin', SpringFilterUtils.likeAll(isAdmin));
            }
        }

        return filterBuild.value;
    }

    public submitForm() {
        this.submit.emit();
    }

    public inizialize(): void {
        this.searchUtenteForm = this.formBuilder.group({
            utenteIdFrom: [null],
            utenteIdTo: [null],
            oauthIdFrom: [null],
            oauthIdTo: [null],
            name: [null],
            surname: [null],
            email: [null],
            isAdmin: [null]
        });
    }
}
