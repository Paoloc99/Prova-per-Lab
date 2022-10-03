import { Injectable } from '@angular/core';
import { BzToastrConfig, BzToastrService } from '@micegroup/voila2-blazing-ng';
import { VoilaTranslateService } from './voila-translate.service';

@Injectable({
    providedIn: 'root'
})
export class ToastrService {
    private _DANGER_DURATION: number = 50000;

    constructor(private toastrService: BzToastrService, private translateService: VoilaTranslateService) {}

    public showDanger(message: string, args?: any): void {
        message = this.translateService.instant(message, args);
        this.toastrService.showDanger(message, { duration: this._DANGER_DURATION });
    }

    public showSuccess(message: string, args?: any): void {
        message = this.translateService.instant(message, args);
        this.toastrService.showSuccess(message);
    }

    public showInfo(message: string, args?: any): void {
        message = this.translateService.instant(message, args);
        this.toastrService.showInfo(message);
    }

    public showWarning(message: string, args?: any): void {
        message = this.translateService.instant(message, args);
        this.toastrService.showWarning(message);
    }

    public showToast(message: string, config?: BzToastrConfig, args?: any): void {
        message = this.translateService.instant(message, args);
        this.toastrService.showToast(message, config);
    }

    /**
     * Show tosat by severity.
     *
     * @param message
     * @param severity
     */
    public showToastBySeverity(message: string, severity: string, args?: any): void {
        message = this.translateService.instant(message, args);
        switch (severity) {
            case 'FATAL':
            case 'ERROR': {
                this.showDanger(message);
                break;
            }
            case 'INFO': {
                this.showSuccess(message);
                break;
            }
            case 'WARING': {
                this.showWarning(message);
                break;
            }
            default: {
                this.showInfo(message);
                break;
            }
        }
    }
}