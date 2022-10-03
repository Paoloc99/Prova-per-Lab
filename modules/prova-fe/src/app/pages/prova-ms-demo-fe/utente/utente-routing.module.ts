import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { getAuthGuards } from 'src/app/security/security.config';
import { AuthGuard, getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';
import { DetailUtenteComponent } from './detail-utente/detail-utente.component';
import { ListUtenteComponent } from './list-utente/list-utente.component';

const Privileges = getPrivilegesEnum();

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list-utente',
                component: ListUtenteComponent,
                canActivate: getAuthGuards(),
                data: { privileges: [Privileges?.UTENTE_SEARCH] }
            },
            {
                path: 'detail-utente/new',
                component: DetailUtenteComponent,
                canActivate: getAuthGuards(),
                data: { pageSatus: 'new', privileges: [Privileges?.UTENTE_CREATE] }
            },
            {
                path: 'detail-utente/:id/view',
                component: DetailUtenteComponent,
                canActivate: getAuthGuards(),
                data: { pageSatus: 'view', privileges: [Privileges?.UTENTE_READ] }
            },
            {
                path: 'detail-utente/:id/edit',
                component: DetailUtenteComponent,
                canActivate: getAuthGuards(),
                data: { pageSatus: 'edit', privileges: [Privileges?.UTENTE_UPDATE] }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UtenteRoutingModule {}
