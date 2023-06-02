import {HttpErrorResponse} from "@angular/common/http";
import {ActionReducer, createReducer, on} from "@ngrx/store";
import {ProductActions} from '../actions';
import {Product} from "@core/api/products";

export interface ProductsState {
    error: HttpErrorResponse | undefined | null;
    products: Product[] | undefined | null;
}

export const productsInitialState: ProductsState = {
    error: undefined,
    products: undefined,
};

export const productsReducer: ActionReducer<ProductsState> = createReducer(
    productsInitialState,
    // on(ProductActions.getProducts, (state) => ({
    //     ...state,
    // })),
    on(ProductActions.getProductsSuccess, (state, {products}) => ({
        ...state,
        error: null,
        products,
    })),
    on(ProductActions.getProductsFailure, (state, {error}) => ({
        ...state,
        error,
        products: null,
    })),
)

