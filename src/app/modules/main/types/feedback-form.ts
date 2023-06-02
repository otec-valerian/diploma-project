import {FormControl} from "@angular/forms";

export interface FeedbackForm {
    feedback: FormControl<number | null>;
}
