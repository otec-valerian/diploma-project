import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {BaseActions} from '../actions';
import {catchError, map, of, switchMap, tap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthenticationService, SignInResponse, SignUpResponse, User} from "@core/api/authentication";

@Injectable({
    providedIn: 'root'
})
export class BaseEffects {
    constructor(private actions$: Actions,
                private authenticationService: AuthenticationService,
                private router: Router) {
    }

    public getUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BaseActions.getUser),
            switchMap(() =>
                this.authenticationService.getCurrentUser().pipe(
                    map((user: User) => {console.log('in ok getuser', user);return BaseActions.getUserSuccess({user})}),
                    catchError((error: HttpErrorResponse) => {console.log('!!!!', error);return of(BaseActions.getUserFailure({ error }))})
                )
            )
        )
    )

    public signIn$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BaseActions.signIn),
            switchMap(({request}) =>
                this.authenticationService.signIn(request).pipe(
                    map((response: SignInResponse) => BaseActions.signInSuccess({user: response.user})),
                    catchError((error: HttpErrorResponse) => of(BaseActions.signInFailure({ error })))
                )
            )
        )
    )

    public signUp$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BaseActions.signUp),
            switchMap(({request}) =>
                this.authenticationService.signUp(request).pipe(
                    map((response: SignUpResponse) => BaseActions.signUpSuccess({user: response.user})),
                    catchError((error: HttpErrorResponse) => of(BaseActions.signUpFailure({ error })))
                )
            )
        )
    )

    public signOut$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BaseActions.signOut),
            switchMap(() =>
                this.authenticationService.signOut().pipe(
                    map((user: User) => BaseActions.signOutSuccess()),
                    catchError((error: HttpErrorResponse) => of(BaseActions.signOutFailure({ error })))
                )
            )
        )
    )

    public authSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BaseActions.signUpSuccess, BaseActions.signInSuccess),
            tap(() => this.router.navigateByUrl('app/main'))
        ), {dispatch: false}
    )

    public signOutSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BaseActions.signOutSuccess),
            tap(() => this.router.navigateByUrl('login'))
        ), {dispatch: false}
    )
}
