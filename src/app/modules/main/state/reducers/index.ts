import {productsInitialState, productsReducer, ProductsState} from "./products.reducer";
import {
    recommendedProductsInitialState,
    recommendedProductsReducer,
    RecommendedProductsState
} from "./recommended-products.reducer";
import {ActionReducer, combineReducers} from "@ngrx/store";

export interface State {
    productsState: ProductsState;
    recommendedProductsState: RecommendedProductsState;
}

export const initialState: State = {
    productsState: productsInitialState,
    recommendedProductsState: recommendedProductsInitialState,
}

export const reducer: ActionReducer<State> = combineReducers(
    {
        productsState: productsReducer,
        recommendedProductsState: recommendedProductsReducer
    },
    initialState
)
