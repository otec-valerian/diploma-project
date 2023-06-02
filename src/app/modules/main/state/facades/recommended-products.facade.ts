import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {RecommendedProductActions} from '../actions';
import {RecommendedProductsSelectors} from '../selectors';
import {HttpErrorResponse} from "@angular/common/http";
import {Product} from "@core/api/products";

@Injectable({
    providedIn: 'root'
})
export class RecommendedProductsFacade {
    public products$: Observable<Product[] | null | undefined> = this.store.select(RecommendedProductsSelectors.getRecommendedProducts);
    public error$: Observable<HttpErrorResponse | null | undefined> = this.store.select(RecommendedProductsSelectors.getError);

    constructor(private store: Store) {
    }

    public dispatchGetRecommendedProducts(): void {
        this.store.dispatch(RecommendedProductActions.getRecommendedProducts());
    }
}
