import {ChangeDetectionStrategy, Component} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {
    AbstractControl, FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators
} from "@angular/forms";
import {SignInForm, SignUpForm} from "../../types";
import {SignInModalComponent, SignUpModalComponent} from "../../ui";
import {BaseFacade} from "@core/state";


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./shell.component.scss'],
    templateUrl: './shell.component.html',
})
export class ShellComponent {
    public signInForm: FormGroup<SignInForm>;
    public signUpForm: FormGroup<SignUpForm>;
    constructor(private fb: FormBuilder,
                private baseFacade: BaseFacade,
                public dialog: MatDialog) {
        this.signInForm = this.fb.group<SignInForm>({
            email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
            password: new FormControl<string | null>(null, [Validators.required])
        });
        this.signUpForm = this.fb.group<SignUpForm>({
            email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
            name: new FormControl<string | null>(null, [Validators.required]),
            password: new FormControl<string | null>(null, [Validators.required]),
            repeatPassword: new FormControl<string | null>(null, [Validators.required, this.createPasswordStrengthValidator])
        });
        console.log('IN LOGIN')
    }

    public onSignInClick(): void {
        const dialogRef = this.dialog.open(SignInModalComponent, {
            data: this.signInForm,
        });

        dialogRef.afterClosed().subscribe(() => {
            console.log('The dialog was closed');
            if (this.signInForm.valid) {
                this.baseFacade.dispatchSignIn({
                    login: this.signInForm.controls.email.value as string,
                    password: this.signInForm.controls.password.value as string,
                })
            }
        });
    }

    public onSignUpClick(): void {
        const dialogRef = this.dialog.open(SignUpModalComponent, {
            data: this.signUpForm,
        });

        dialogRef.afterClosed().subscribe(() => {
            console.log('The dialog was closed');
            if (this.signUpForm.valid) {
                this.baseFacade.dispatchSignUp({
                    name: this.signUpForm.controls.name.value as string,
                    login: this.signUpForm.controls.email.value as string,
                    password: this.signUpForm.controls.password.value as string,
                })
            }
        });
    }

    public createPasswordStrengthValidator(): ValidatorFn {
        return (control:AbstractControl) : ValidationErrors | null => {
            if (control.get('password')?.value !== control.get('repeatPassword')?.value) {
                return {passwordsAreNotTheSame: true}
            }
            return null;
        }
    }
}
