import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ProductActions} from '../actions';
import {catchError, map, of, switchMap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {Product, ProductsService} from "@core/api/products";

@Injectable({
    providedIn: 'root'
})
export class ProductsEffects {
    constructor(private actions$: Actions,
                private productsService: ProductsService,
                private router: Router) {
    }

    public getProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.getProducts),
            switchMap(() =>
                this.productsService.getProducts().pipe(
                    map((response: Product[]) => {console.log('!!!', response);return ProductActions.getProductsSuccess({products: response})}),
                    catchError((error: HttpErrorResponse) => of(ProductActions.getProductsFailure({ error })))
                )
            )
        )
    )

    public buyProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.buyProduct),
            switchMap(({uuid}) =>
                this.productsService.buyProduct(uuid).pipe(
                    map((response: Product) => ProductActions.buyProductSuccess({product: response})),
                    catchError((error: HttpErrorResponse) => of(ProductActions.buyProductsFailure({ error })))
                )
            )
        )
    )

    public feedbackProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.feedbackProduct),
            switchMap(({uuid, mark}) =>
                this.productsService.setProductFeedback({uuid, mark}).pipe(
                    map((response: Product) => ProductActions.feedbackProductSuccess({product: response})),
                    catchError((error: HttpErrorResponse) => of(ProductActions.feedbackProductFailure({ error })))
                )
            )
        )
    )
}
