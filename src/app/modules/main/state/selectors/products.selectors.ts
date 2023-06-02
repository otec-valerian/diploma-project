import {createFeatureSelector, createSelector} from "@ngrx/store";
import {FEATURE_KEY} from "../state.constants";
import {State} from "../reducers";

const getState = createFeatureSelector<State>(FEATURE_KEY);

export const getProducts = createSelector(getState, (state) => state.productsState.products);
export const getError = createSelector(getState, (state) => state.productsState.error);
