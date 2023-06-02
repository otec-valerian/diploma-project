import {createFeatureSelector, createSelector} from "@ngrx/store";
import {FEATURE_KEY} from "../state.constants";
import {State} from "../reducers";

const getState = createFeatureSelector<State>(FEATURE_KEY);

export const getRecommendedProducts = createSelector(getState, (state) => state.recommendedProductsState.products);
export const getError = createSelector(getState, (state) => state.recommendedProductsState.error);
