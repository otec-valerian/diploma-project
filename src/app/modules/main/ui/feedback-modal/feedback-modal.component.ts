import {ChangeDetectionStrategy, Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {FeedbackForm} from "../../types";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-feedback-modal',
    styleUrls: ['./feedback-modal.component.scss'],
    templateUrl: './feedback-modal.component.html'
})
export class FeedbackModalComponent {
    constructor(public dialogRef: MatDialogRef<FeedbackModalComponent>,
                @Inject(MAT_DIALOG_DATA) public form: FormGroup<FeedbackForm>) {
    }

    public onCancelClick(): void {
        this.dialogRef.close();
    }
}
