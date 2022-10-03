import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateService } from '@micegroup/voila2-blazing-ng';
import { OrdineGroupApiService } from '../../ordine-group-api.service';
import {} from '@micegroup/voila2-runtime-ng';

import { SpringFilter, SpringFilterUtils } from 'spring-filter-ng';
import { IUtente } from '../../../utente/utente.interface';
import { UtenteApiService } from '../../../utente/utente-api.service';

const PROVIDERS = [OrdineGroupApiService, UtenteApiService];
import { getTime, springFilterLocaleDate, springFilterLocaleDateTime } from '../../../../../utilities/function/helper';
import { getListForDropdowns } from 'src/app/shared/base/base.helper';

@Component({
    selector: 'app-search-ordine',
    templateUrl: './search-ordine.component.html',
    styleUrls: ['../../ordine.scss'],
    providers: [...PROVIDERS]
})
export class SearchOrdineComponent implements OnInit {
    public searchOrdineForm!: FormGroup;
    public utenteList: IUtente[] = [];

    @Output() submit: EventEmitter<void> = new EventEmitter<void>();

    constructor(private formBuilder: FormBuilder, private dateService: DateService, private ordineGroupApiService: OrdineGroupApiService) {}

    ngOnInit(): void {
        this.inizialize();
        this.getParentsList();
    }

    public search(): any {
        let filterBuild = new SpringFilter().build();
        const searchOrdine = this.searchOrdineForm.value;

        if (searchOrdine) {
            const ordineIdFrom = searchOrdine.ordineIdFrom;
            if (ordineIdFrom) {
                filterBuild = SpringFilterUtils.addAND(filterBuild);
                filterBuild = filterBuild.greaterOrEqual('ordineId', ordineIdFrom);
            }
            const ordineIdTo = searchOrdine.ordineIdTo;
            if (ordineIdTo) {
                filterBuild = SpringFilterUtils.addAND(filterBuild);
                filterBuild = filterBuild.smallerOrEqual('ordineId', ordineIdTo);
            }

            const dateFrom = searchOrdine.dateFrom;
            if (dateFrom) {
                filterBuild = SpringFilterUtils.addAND(filterBuild);
                filterBuild = filterBuild.greaterOrEqual('date', springFilterLocaleDate(dateFrom));
            }
            const dateTo = searchOrdine.dateTo;
            if (dateTo) {
                filterBuild = SpringFilterUtils.addAND(filterBuild);
                filterBuild = filterBuild.smallerOrEqual('date', springFilterLocaleDate(dateTo));
            }

            const totalCostFrom = searchOrdine.totalCostFrom;
            if (totalCostFrom) {
                filterBuild = SpringFilterUtils.addAND(filterBuild);
                filterBuild = filterBuild.greaterOrEqual('totalCost', totalCostFrom);
            }
            const totalCostTo = searchOrdine.totalCostTo;
            if (totalCostTo) {
                filterBuild = SpringFilterUtils.addAND(filterBuild);
                filterBuild = filterBuild.smallerOrEqual('totalCost', totalCostTo);
            }

            const address = searchOrdine.address;
            if (address) {
                filterBuild = SpringFilterUtils.addAND(filterBuild);
                filterBuild = filterBuild.like('address', SpringFilterUtils.likeAll(address));
            }

            const theUtenteObjectKey = searchOrdine.theUtenteObjectKey;
            // theUtenteObjectKey
            if (theUtenteObjectKey) {
                filterBuild = SpringFilterUtils.addAND(filterBuild);
                filterBuild = filterBuild.equals('theUtente.utenteId', theUtenteObjectKey);
            }
        }

        return filterBuild.value;
    }

    public submitForm() {
        this.submit.emit();
    }

    public inizialize(): void {
        this.searchOrdineForm = this.formBuilder.group({
            ordineIdFrom: [null],
            ordineIdTo: [null],
            dateFrom: [null],
            dateTo: [null],
            totalCostFrom: [null],
            totalCostTo: [null],
            address: [null],
            theUtenteObjectKey: [null]
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
