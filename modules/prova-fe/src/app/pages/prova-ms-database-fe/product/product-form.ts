import { FormBuilder, Validators } from '@angular/forms';
import { BzControlUtils } from '@micegroup/voila2-blazing-ng';

export function productForm(formBuilder: FormBuilder) {
    return formBuilder.group({
        productId: [null, Validators.required],
        productName: [null, Validators.maxLength(80)],
        cost: [null],
        disponibility: [null],
        description: [null, Validators.maxLength(80)],
        image: [null, Validators.maxLength(80)]
    });
}
