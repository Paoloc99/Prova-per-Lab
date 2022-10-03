import { FormBuilder, Validators } from '@angular/forms';
import { BzControlUtils } from '@micegroup/voila2-blazing-ng';

export function utenteForm(formBuilder: FormBuilder) {
    return formBuilder.group({
        utenteId: [null, Validators.required],
        oauthId: [null],
        name: [null, Validators.maxLength(80)],
        surname: [null, Validators.maxLength(80)],
        email: [null, Validators.compose([Validators.maxLength(80), Validators.email])],
        isAdmin: [null],
        theOrdine: [[]]
    });
}
