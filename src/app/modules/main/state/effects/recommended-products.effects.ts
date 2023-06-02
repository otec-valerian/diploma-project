import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {RecommendedProductActions} from '../actions';
import {catchError, map, of, switchMap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {Product, ProductsService} from "@core/api/products";

@Injectable({
    providedIn: 'root'
})
export class RecommendedProductsEffects {
    constructor(private actions$: Actions,
                private productsService: ProductsService,
                private router: Router) {
    }

    public getRecommendedProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecommendedProductActions.getRecommendedProducts),
            switchMap(() =>
                this.productsService.getRecommendedProducts().pipe(
                    map((response: Product[]) => RecommendedProductActions.getRecommendedProductsSuccess({products: response})),
                    catchError((error: HttpErrorResponse) => of(RecommendedProductActions.getRecommendedProductsFailure({ error })))
                )
            )
        )
    )
}
