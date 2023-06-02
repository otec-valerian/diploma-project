import {HttpErrorResponse} from "@angular/common/http";
import {ActionReducer, createReducer, on} from "@ngrx/store";
import {BaseActions} from '../actions';
import {User} from "@core/api/authentication";

export interface State {
    error: HttpErrorResponse | undefined | null;
    user: User | undefined | null;
}

export const initialState: State = {
    error: undefined,
    user: undefined,
};

export const reducer: ActionReducer<State> = createReducer(
    initialState,
    on(BaseActions.getUser, (state) => ({
        ...state,
    })),
    on(BaseActions.getUserSuccess, (state, {user}) => ({
        ...state,
        error: null,
        user,
    })),
    on(BaseActions.getUserFailure, (state, {error}) => ({
        ...state,
        error,
        user: null,
    })),

    on(BaseActions.signIn, (state) => ({
        ...state,
    })),
    on(BaseActions.signInSuccess, (state, {user}) => ({
        ...state,
        error: null,
        user,
    })),
    on(BaseActions.signInFailure, (state, {error}) => ({
        ...state,
        error,
        user: null,
    })),

    on(BaseActions.signUp, (state) => ({
        ...state,
    })),
    on(BaseActions.signUpSuccess, (state, {user}) => ({
        ...state,
        error: null,
        user,
    })),
    on(BaseActions.signUpFailure, (state, {error}) => ({
        ...state,
        error,
        user: null,
    })),

    on(BaseActions.signOutSuccess, (state) => ({
        ...state,
        user: null,
    }))
)

