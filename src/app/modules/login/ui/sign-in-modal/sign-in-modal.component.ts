import {ChangeDetectionStrategy, Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {SignInForm} from "../../types";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-sign-in-modal',
    styleUrls: ['./sign-in-modal.component.scss'],
    templateUrl: './sign-in-modal.component.html'
})
export class SignInModalComponent {
    constructor(public dialogRef: MatDialogRef<SignInModalComponent>,
                @Inject(MAT_DIALOG_DATA) public form: FormGroup<SignInForm>) {
    }

    public onCancelClick(): void {
        this.dialogRef.close();
    }
}
