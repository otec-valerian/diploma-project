import {createAction, props} from "@ngrx/store";
import {storeUtil} from "@shared/utils/store";
import {FEATURE_KEY} from "../state.constants";
import {HttpErrorResponse} from "@angular/common/http";
import {SignInRequest, SignUpRequest, User} from "@core/api/authentication";

export const getUser = createAction(storeUtil.getActionType(FEATURE_KEY, 'Get User'))
export const getUserSuccess = createAction(storeUtil.getActionType(FEATURE_KEY, 'Get User Success'), props<{user: User}>())
export const getUserFailure = createAction(storeUtil.getActionType(FEATURE_KEY, 'Get User Failure'), props<{error: HttpErrorResponse}>())

export const signIn = createAction(storeUtil.getActionType(FEATURE_KEY, 'Sign In'), props<{request: SignInRequest}>())
export const signInSuccess = createAction(storeUtil.getActionType(FEATURE_KEY, 'Sign In Success'), props<{user: User}>())
export const signInFailure = createAction(storeUtil.getActionType(FEATURE_KEY, 'Sign In Failure'), props<{error: HttpErrorResponse}>())

export const signUp = createAction(storeUtil.getActionType(FEATURE_KEY, 'Sign Up'), props<{request: SignUpRequest}>())
export const signUpSuccess = createAction(storeUtil.getActionType(FEATURE_KEY, 'Sign Up Success'), props<{user: User}>())
export const signUpFailure = createAction(storeUtil.getActionType(FEATURE_KEY, 'Sign Up Failure'), props<{error: HttpErrorResponse}>())

export const signOut = createAction(storeUtil.getActionType(FEATURE_KEY, 'Sign Out'))
export const signOutSuccess = createAction(storeUtil.getActionType(FEATURE_KEY, 'Sign Out Success'))
export const signOutFailure = createAction(storeUtil.getActionType(FEATURE_KEY, 'Sign Out Failure'), props<{error: HttpErrorResponse}>())
