import { FormBuilder, Validators } from '@angular/forms';
import { BzControlUtils } from '@micegroup/voila2-blazing-ng';

export function productForm(formBuilder: FormBuilder) {
    return formBuilder.group({
        productId: [null, Validators.required],
        theOrderItem: [[]]
    });
}
