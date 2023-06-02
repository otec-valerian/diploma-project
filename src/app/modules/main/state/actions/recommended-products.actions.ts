import {createAction, props} from "@ngrx/store";
import {storeUtil} from "@shared/utils/store";
import {FEATURE_KEY} from "../state.constants";
import {Product} from "@core/api/products";
import {HttpErrorResponse} from "@angular/common/http";

export const getRecommendedProducts = createAction(storeUtil.getActionType(FEATURE_KEY, 'Get Recommended Products'));
export const getRecommendedProductsSuccess = createAction(storeUtil.getActionType(FEATURE_KEY, 'Get Recommended Products Success'), props<{products: Product[]}>());
export const getRecommendedProductsFailure = createAction(storeUtil.getActionType(FEATURE_KEY, 'Get Recommended Products Failure'), props<{error: HttpErrorResponse}>());
