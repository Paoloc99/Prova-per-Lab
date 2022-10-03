import { Injectable } from '@angular/core';
import { TranslateService } from '@micegroup/voila2-translate-ng';

@Injectable()
export class VoilaTranslateService extends TranslateService{

    /**
     * Overrides
     */
     instant(key: string | Array<string>, interpolateParams?: Object): string | any {
        const tmp: {[key:string]: string} = {};
        if(interpolateParams) {
            Object.entries(interpolateParams).map(([k,v]) => {
                tmp[k] = super.instant(v);
            })
            return super.instant(key, tmp);
        }
        else {
            return super.instant(key, interpolateParams);
        }
    }

    public resolveMessage(m: any): string {
        let args: string[] = [];
        args.push(this.resolveField(m.objectName + "." + m.field));
        for (let c = 1; c < m.arguments.length; c++) {
            args.push(m.arguments[c]);
        }
        for (let c = 0; c < m.codes.length; c++) {
            let key:string = 'errors.' + m.codes[c];
            let msg: string = super.instant(key, args);
            if (msg != key) {
                return msg;
            }
        }
        return m.errorMessage;
    }

    resolveEntity(field: string) {
        return this.resolveField(field + ".label");
    }

    resolveField(field: string) {
        let fieldKey: string = "detail." + field; 
        let fieldName: string = this.instant(fieldKey);
        if (fieldName != fieldKey) {
            return fieldName;
        } else {
            return field;
        }
    }


}