 import { HttpParams } from "@angular/common/http";
import { PageObject, PaginationUtils } from '@micegroup/voila2-blazing-ng';
import { SpringFilterUtils } from "spring-filter-ng";
 import { formatDate } from "@angular/common";
import { BzDateUtils } from '@micegroup/voila2-blazing-ng';
import { FormArray, FormGroup } from '@angular/forms';


/**
  * Convert value into date object.
  * 
  * @author Federico Gambardella<federico.gambardella@micegroup.it>
  * @param value 
  * @returns 
  */
  export function convertIntoDate(value: string) : any {
    if(value) 
       return new Date(value)
    return value
 }

 /**
  * Convert date in standard format.
  * 
  * @author Federico Gambardella<federico.gambardella@micegroup.it>
  * @param date 
  * @returns 
  */
 export function toStandardDate(date: Date): string {
    if(date)
      return formatDate(date,"yyyy-MM-dd'T'HH:mm:ss", 'en');
    else
      return "";
  }

 /**
  * Set options for pagination and filter.
  * 
  * @author Federico Gambardella<federico.gambardella@micegroup.it>
  * @param pageObject 
  * @param filter 
  * @returns 
  */
 export function setOptions(pageObject: PageObject, filter?: string ) : HttpParams {
   filter = filter ? filter: "";
   let options = SpringFilterUtils.setOptions(filter);
   return PaginationUtils.setOptionsForSpring(pageObject, {}, options);
 }

 /**
  * Stringify local date for spring filter library.
  * 
  * @author Federico Gambardella<federico.gambardella@micegroup.it>
  * @param date 
  * @returns 
  */
 export function springFilterLocaleDate(date: Date) : string {
   return formatDate(date, "dd-MM-yyyy", 'en');
 }

 /**
  * Stringify date time for spring filter library.
  * 
  * @author Federico Gambardella<federico.gambardella@micegroup.it>
  * @param date 
  * @returns 
  */
 export function springFilterLocaleDateTime(date: Date) : string {
    return formatDate(date, "dd-MM-yyyy'T'HH:mm:ss", 'en');
 }

	/**
  * Convert date in standard format.
  *
  * @author Federico Gambardella<federico.gambardella@micegroup.it>
  * @param date
  * @returns
  */
  export function getTime(date: Date): string {
   if(date) 
    return BzDateUtils.getTime(date);
  else
    return "";
	}

   /**
  * Convert date in standard format.
  *
  * @author Federico Gambardella<federico.gambardella@micegroup.it>
  * @param date
  * @returns
  */
  export function getDateFromTime(date: string): any {
  	if(date)
    	return BzDateUtils.getDateFromTime(date);
    else
      return date;
  }

/* 
   Returns an array of invalid control/group names, or a zero-length array if 
   no invalid controls/groups where found 
*/
export function findInvalidControlsRecursive(formToInvestigate: FormGroup | FormArray, log? : boolean): object[] {
    var invalidControls: object[] = [];
    let recursiveFunc = (form: FormGroup | FormArray) => {
        Object.keys(form.controls).forEach(field => {
            const control = form.get(field);
            if (control!.invalid) {
                const fieldObject = {name: field, control: control};
                invalidControls.push(fieldObject);
                if (log) {
                    console.log("invalid form control:", fieldObject);
                }
            }
            if (control instanceof FormGroup) {
                recursiveFunc(control);
            } else if (control instanceof FormArray) {
                recursiveFunc(control);
            }
        });
    };
    recursiveFunc(formToInvestigate);
    return invalidControls;
}
