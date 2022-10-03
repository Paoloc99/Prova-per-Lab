import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUtenteComponent } from './list-utente/list-utente.component';
import {
    BzButtonModule,
    BzCardModule,
    BzDatePickerModule,
    BzDropdownModule,
    BzErrorModule,
    BzEventModule,
    BzIconModule,
    BzInputModule,
    BzSwitchModule,
    BzSwitch3Module,
    BzTableModule,
    BzTabsetModule,
    BzToastrModule,
    BzTooltipModule,
    BzButtonsPanelModule,
    BzDialogModule
} from '@micegroup/voila2-blazing-ng';
import { UtenteRoutingModule } from './utente-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchUtenteComponent } from './list-utente/search-utente/search-utente.component';
import { DetailUtenteComponent } from './detail-utente/detail-utente.component';
import { RouterModule } from '@angular/router';
import { UtilityPipeModule } from '../../../utilities/pipe/utility-pipe.module';
import { TranslateModule } from '@micegroup/voila2-translate-ng';
import { TabsUtenteComponent } from './detail-utente/tabs-utente/tabs-utente.component';
import { DialogListUtenteComponent } from '../dialog/dialog-list-utente/dialog-list-utente.component';
import { TabOrdineComponent } from './detail-utente/tabs-utente/ordine/tab-ordine.component';

const COMPONENTS = [ListUtenteComponent, SearchUtenteComponent, DetailUtenteComponent, TabsUtenteComponent, DialogListUtenteComponent, TabOrdineComponent];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [
        CommonModule,
        BzCardModule,
        BzTableModule,
        UtenteRoutingModule,
        BzButtonModule,
        BzInputModule,
        ReactiveFormsModule,
        BzDatePickerModule,

        BzSwitchModule,
        BzSwitch3Module,
        FormsModule,
        RouterModule,
        BzTooltipModule,
        BzDropdownModule,
        BzToastrModule,
        BzErrorModule,
        UtilityPipeModule,
        BzDialogModule,
        BzTabsetModule,
        BzEventModule,
        TranslateModule,
        BzIconModule,
        BzButtonsPanelModule
    ]
})
export class UtenteModule {}
