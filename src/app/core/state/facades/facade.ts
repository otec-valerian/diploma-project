import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {BaseActions} from '../actions';
import {BaseSelectors} from '../selectors';
import {HttpErrorResponse} from "@angular/common/http";
import {SignInRequest, SignUpRequest, User} from "@core/api/authentication";

@Injectable({
    providedIn: 'root'
})
export class BaseFacade {
    public user$: Observable<User | null | undefined> = this.store.select(BaseSelectors.getUser);
    public error$: Observable<HttpErrorResponse | null | undefined> = this.store.select(BaseSelectors.getError);

    constructor(private store: Store) {
    }

    public dispatchGetUser(): void {
        this.store.dispatch(BaseActions.getUser());
    }

    public dispatchSignIn(request: SignInRequest): void {
        this.store.dispatch(BaseActions.signIn({request}));
    }

    public dispatchSignUp(request: SignUpRequest): void {
        this.store.dispatch(BaseActions.signUp({request}));
    }

    public dispatchSignOut(): void {
        this.store.dispatch(BaseActions.signOut());
    }
}
