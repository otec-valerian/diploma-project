import {createAction, props} from "@ngrx/store";
import {storeUtil} from "@shared/utils/store";
import {FEATURE_KEY} from "../state.constants";
import {Product} from "@core/api/products";
import {HttpErrorResponse} from "@angular/common/http";

export const getProducts = createAction(storeUtil.getActionType(FEATURE_KEY, 'Get Products'));
export const getProductsSuccess = createAction(storeUtil.getActionType(FEATURE_KEY, 'Get Products Success'), props<{products: Product[]}>());
export const getProductsFailure = createAction(storeUtil.getActionType(FEATURE_KEY, 'Get Products Failure'), props<{error: HttpErrorResponse}>());

export const buyProduct = createAction(storeUtil.getActionType(FEATURE_KEY, 'Buy Product'), props<{uuid: string}>());
export const buyProductSuccess = createAction(storeUtil.getActionType(FEATURE_KEY, 'Buy Product Success'), props<{product: Product}>());
export const buyProductsFailure = createAction(storeUtil.getActionType(FEATURE_KEY, 'Buy Product Failure'), props<{error: HttpErrorResponse}>());

export const feedbackProduct = createAction(storeUtil.getActionType(FEATURE_KEY, 'Feedback Product'), props<{uuid: string, mark: number}>());
export const feedbackProductSuccess = createAction(storeUtil.getActionType(FEATURE_KEY, 'Feedback Product Success'), props<{product: Product}>());
export const feedbackProductFailure = createAction(storeUtil.getActionType(FEATURE_KEY, 'Feedback Product Failure'), props<{error: HttpErrorResponse}>());
