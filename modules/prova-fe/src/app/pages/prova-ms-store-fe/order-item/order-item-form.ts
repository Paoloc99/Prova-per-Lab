import { FormBuilder, Validators } from '@angular/forms';
import { BzControlUtils } from '@micegroup/voila2-blazing-ng';

export function orderItemForm(formBuilder: FormBuilder) {
    return formBuilder.group({
        ordineId: [null],
        theOrdineObjectKey: [null, Validators.required],
        theOrdineObjectTitle: [null],
        productId: [null],
        theProductObjectKey: [null, Validators.required],
        theProductObjectTitle: [null],
        amount: [null]
    });
}
