import { Pipe, PipeTransform } from "@angular/core";
import { IsEqualPipe, isEquals } from '@micegroup/voila2-blazing-ng';
import { environment } from "src/environments/environment";
import { VoilaTranslateService } from 'src/app/utilities/services/voila-translate.service';
import { PageStatus } from '@micegroup/voila2-runtime-ng';

@Pipe({

    name: 'hasPageStatus'
})
export class PageStatusPipe extends IsEqualPipe {
}

@Pipe({
    name: 'hasPermission'
})
export class PermissionPipe  {

    public transform(element: any, expectedElementList: any[] | any): boolean {
        if(environment.securityOn)
           return isEquals(element, expectedElementList);
        return true;
    }
}

@Pipe({
    name: 'isReadOnly'
})
export class ReadOnlyPipe  {

    public transform(pageSatus: string, isReadOnly: boolean): boolean {
         if(isEquals(pageSatus, PageStatus.NEW) && isReadOnly) 
             return false;
         return true;
    }
}

@Pipe({
    name: 'siNo'
})
export class siNoPipe implements PipeTransform {

    public transform(value: any, ...args: any[]): any {
        if(value!==null){
            return value ? "Sì" : "No";
        }
        return null;
    }
}


@Pipe({
    name: 'tableInfo'
})
export class tableInfoPipe implements PipeTransform {
    constructor(private translateService: VoilaTranslateService) {
    }
    
    public transform(value: any, totalElements: number, page: number, pageSize: number): any {
        if (totalElements == 0) {
            return '';
        }
        if (totalElements == 1) {
            return this.translateService.instant('table.countSummary');
        }
        return this.translateService.instant('table.countSummaries', {
            "totalElements": totalElements.toString(),
            "start": (page * pageSize + 1).toString(),
            "end": (Math.min((page + 1) * pageSize, totalElements)).toString()
        });
    }
}

@Pipe({
    name: 'voilaTranslate'
})
export class voilaTranslatePipe implements PipeTransform {
    constructor(private translateService: VoilaTranslateService) {
    }
    
    public transform(value: string, args?: {[key:string]: string}): any {
        return this.translateService.instant(value, args);
        
    }
}
