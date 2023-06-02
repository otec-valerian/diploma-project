import {ChangeDetectionStrategy, Component} from "@angular/core";
import {ProductsFacade, RecommendedProductsFacade} from "../../state";
import {filter, Observable, take} from "rxjs";
import {Product} from "@core/api/products";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {Actions} from "@ngrx/effects";
import {FeedbackForm} from "../../types";
import {FeedbackModalComponent} from "../../ui";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./shell.component.scss'],
    templateUrl: './shell.component.html'
})
export class ShellComponent {

    public products$: Observable<Product[]> = this.productsFacade.products$.pipe(filter(products => !!products)) as Observable<Product[]>;
    public recommendedProducts$: Observable<Product[]> = this.recommendedProductsFacade.products$.pipe(filter(products => !!products)) as Observable<Product[]>;
    public feedbackForm: FormGroup<FeedbackForm>;
    constructor(private productsFacade: ProductsFacade,
                private recommendedProductsFacade: RecommendedProductsFacade,
                private fb: FormBuilder,
                private actions$: Actions,
                public dialog: MatDialog) {
        this.feedbackForm = this.fb.group<FeedbackForm>({
            feedback: new FormControl<number | null>(0, [Validators.required])
        });
        this.productsFacade.dispatchGetProducts();
    }

    public onBuyProductClick(uuid: string): void {
        this.productsFacade.dispatchBuyProduct(uuid);
        this.productsFacade.buyProductSuccess$.pipe(
            filter((product: Product) => !!product),
            take(1)
        ).subscribe((product: Product) => {
            const dialogRef = this.dialog.open(FeedbackModalComponent, {
                data: this.feedbackForm,
            });

            dialogRef.afterClosed().subscribe(() => {
                console.log('The dialog was closed');
                if (this.feedbackForm.valid) {
                    this.productsFacade.dispatchFeedbackProduct({
                        uuid: product.uuid,
                        mark: this.feedbackForm.controls.feedback.value as number
                    })
                }
            });
        })
    }

    public onGetRecommendedProductClick(): void {
        this.recommendedProductsFacade.dispatchGetRecommendedProducts();
    }
}
