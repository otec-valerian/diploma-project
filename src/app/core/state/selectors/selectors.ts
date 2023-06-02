import {createFeatureSelector, createSelector} from "@ngrx/store";
import {FEATURE_KEY} from "../state.constants";
import {State} from "../reducers/reducer";

const getState = createFeatureSelector<State>(FEATURE_KEY);

export const getUser = createSelector(getState, (state) => state.user);
export const getError = createSelector(getState, (state) => state.error);
