import {FormControl} from "@angular/forms";

export interface SignInForm {
    email: FormControl<string | null>;
    password: FormControl<string | null>;
}
