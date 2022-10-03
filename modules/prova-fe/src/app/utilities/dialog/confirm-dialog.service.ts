import { Injectable } from '@angular/core';
import { BzDialogService } from '@micegroup/voila2-blazing-ng';
import { Observable } from 'rxjs';
import { VoilaTranslateService } from 'src/app/utilities/services/voila-translate.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Injectable()
export class ConfirmDialogService {

  constructor(private dialogService: BzDialogService, private translateService: VoilaTranslateService) {}


   public openConfirmDialog( message: string, title ?:string, icon ?: string) : Observable<any> {
        const prop = { 
              message: this.translateService.instant(message),
              title: title || 'Attenzione',
              icon: icon || 'fa fa-exclamation-triangle'
        }
        return this.dialogService.showDialog(ConfirmDialogComponent, {properties: prop})
   }

}
