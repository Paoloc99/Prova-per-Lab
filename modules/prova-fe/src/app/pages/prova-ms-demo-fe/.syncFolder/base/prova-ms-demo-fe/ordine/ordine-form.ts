import { FormBuilder, Validators } from '@angular/forms';
import { BzControlUtils } from '@micegroup/voila2-blazing-ng';

export function ordineForm(formBuilder: FormBuilder) {
    return formBuilder.group({
        ordineId: [null, Validators.required],
        date: [null],
        totalCost: [null],
        attribute: [null, Validators.maxLength(80)],
        theUtenteObjectKey: [null, Validators.required],
        theUtenteObjectTitle: [null],
        theOrderItem: [[]]
    });
}
