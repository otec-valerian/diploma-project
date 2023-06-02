import {HttpErrorResponse} from "@angular/common/http";
import {ActionReducer, createReducer, on} from "@ngrx/store";
import {RecommendedProductActions} from '../actions';
import {Product} from "@core/api/products";

export interface RecommendedProductsState {
    error: HttpErrorResponse | undefined | null;
    products: Product[] | undefined | null;
}

export const recommendedProductsInitialState: RecommendedProductsState = {
    error: undefined,
    products: undefined,
};

export const recommendedProductsReducer: ActionReducer<RecommendedProductsState> = createReducer(
    recommendedProductsInitialState,
    on(RecommendedProductActions.getRecommendedProductsSuccess, (state, {products}) => ({
        ...state,
        error: null,
        products,
    })),
    on(RecommendedProductActions.getRecommendedProductsFailure, (state, {error}) => ({
        ...state,
        error,
        products: null,
    })),
)

