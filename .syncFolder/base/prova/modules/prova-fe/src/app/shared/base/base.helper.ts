import { PaginationUtils, ObjectUtils } from '@micegroup/voila2-blazing-ng';
import { HttpParams } from "@angular/common/http";
import { isInViewMode } from '@micegroup/voila2-runtime-ng';

/**
 * Fill options.
 * 
 * @author Federico Gambardella<federico.gambardella@micegroup.it>
 * @param pageStatus 
 * @param object 
 */
export function fillOptions(pageStatus: string, object: any) : HttpParams | undefined {
   let options: HttpParams | undefined;
    if(isInViewMode(pageStatus)) {
       options = PaginationUtils.setOptionsForSpring(object);
    }
    else options = undefined;
   return options;
}

/**
 * Set tab objectKey.
 * 
 * @author Federico Gambardella<federico.gambardella@micegroup.it>
 * @param source
 * @param instance
 * @param prop
 * @param modelName
 */
 export function setTabObjectKey(source: any, instance: any, prop: string, modelName: string): void {
   for (let child of ObjectUtils.resolveProps(source, prop)) {
     const objectKey = instance.getObjectKey(); 
     ObjectUtils.resolveProps(child,  modelName, objectKey !== undefined ? objectKey : null)
   }
 }
 
 /**
  * * Get list for dropdown.
  * 
  * @author Federico Gambardella<federico.gambardella@micegroup.it>
  * @param entityName 
  * @param data 
  * @param value 
  * @param optionValue 
  * @param label 
  * @param optionLabel 
  * @returns 
  */
  export function getListForDropdowns(data: any, value?: string, optionValue?: string,  label?: string, optionLabel?: string, ) : any {
      let list: any = data.content;
      const opLabel: string = optionLabel || 'objectTitle';
      const opValue: string = optionValue || 'objectKey';
      const labelValue: any = label || '';
      const valueToSend : any = value || null;
      let object = Object.assign({})
      object[opLabel] =  labelValue;
      object[opValue] = valueToSend;
      list.unshift(object);
      return list;
 }