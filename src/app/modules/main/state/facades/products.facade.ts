import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {map, Observable} from "rxjs";
import {ProductActions} from '../actions';
import {ProductsSelectors} from '../selectors';
import {HttpErrorResponse} from "@angular/common/http";
import {Product} from "@core/api/products";
import {Actions, ofType} from "@ngrx/effects";

@Injectable({
    providedIn: 'root'
})
export class ProductsFacade {
    public products$: Observable<Product[] | null | undefined> = this.store.select(ProductsSelectors.getProducts);
    public error$: Observable<HttpErrorResponse | null | undefined> = this.store.select(ProductsSelectors.getError);
    public buyProductSuccess$: Observable<Product> = this.actions$.pipe(
        ofType(ProductActions.buyProductSuccess),
        map(({product}) => product)
    )

    constructor(private actions$: Actions, 
                private store: Store) {
    }

    public dispatchGetProducts(): void {
        console.log('disaptch get products')
        this.store.dispatch(ProductActions.getProducts());
    }

    public dispatchBuyProduct(uuid: string): void {
        this.store.dispatch(ProductActions.buyProduct({uuid}));
    }

    public dispatchFeedbackProduct(request: {uuid: string, mark: number}): void {
        this.store.dispatch(ProductActions.feedbackProduct(request));
    }
}
