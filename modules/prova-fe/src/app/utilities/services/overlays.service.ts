import { Injectable, Injector} from "@angular/core";
import { BzDialogService } from '@micegroup/voila2-blazing-ng';
import { ConfirmDialogService } from "../dialog/confirm-dialog.service";
import { ToastrService } from "./toastr.service";

@Injectable() 
export class OverlaysService {

    private toastService !: ToastrService;
    private dialogService !: BzDialogService;
    private confirmDialogService !: ConfirmDialogService

    constructor(private injector: Injector){}
   
    get toast() : ToastrService {
        if(!this.toastService)
           this.toastService = this.injector.get(ToastrService);
        return this.toastService;
    }

    get dialog() : BzDialogService {
        if(!this.dialogService)
          this.dialogService = this.injector.get(BzDialogService);
        return this.dialogService;
    }

    get confirmDialog() : ConfirmDialogService {
        if(!this.confirmDialogService)
          this.confirmDialogService = this.injector.get(ConfirmDialogService);
        return this.confirmDialogService;
    }
}
