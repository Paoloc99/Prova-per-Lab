import { NgModule } from '@angular/core';
import { ListUtenteComponent } from './list-utente/list-utente.component';
import { UtenteRoutingModule } from './utente-routing.module';
import { SearchUtenteComponent } from './list-utente/search-utente/search-utente.component';
import { DetailUtenteComponent } from './detail-utente/detail-utente.component';
import { TabsUtenteComponent } from './detail-utente/tabs-utente/tabs-utente.component';
import { DialogListUtenteComponent } from '../dialog/dialog-list-utente/dialog-list-utente.component';
import { TabOrdineComponent } from './detail-utente/tabs-utente/ordine/tab-ordine.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';

const COMPONENTS = [ListUtenteComponent, SearchUtenteComponent, DetailUtenteComponent, TabsUtenteComponent, DialogListUtenteComponent, TabOrdineComponent];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [UtenteRoutingModule, SharedModule]
})
export class UtenteModule {}
