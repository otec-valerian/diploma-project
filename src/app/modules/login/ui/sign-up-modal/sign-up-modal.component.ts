import {ChangeDetectionStrategy, Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {SignUpForm} from "../../types";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-sign-up-modal',
    styleUrls: ['./sign-up-modal.component.scss'],
    templateUrl: './sign-up-modal.component.html'
})
export class SignUpModalComponent {
    constructor(public dialogRef: MatDialogRef<SignUpModalComponent>,
                @Inject(MAT_DIALOG_DATA) public form: FormGroup<SignUpForm>) {
    }

    public onCancelClick(): void {
        this.dialogRef.close();
    }
}
