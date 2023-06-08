import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "@environment";
import {delay, Observable, of} from "rxjs";
import {User,SignInRequest, SignInResponse, SignUpRequest, SignUpResponse} from "./authentication.types";
import { throwError } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private apiUrl = environment.apiUrl;

    constructor(private httpClient: HttpClient) {
    }

    public getCurrentUser(): Observable<User> {
        // return this.httpClient.get<User>(`${this.apiUrl}/current-user`);
        // return of({uuid: '1', login: 'otec_valerian', name: 'OTEC'}).pipe(delay(1000));
        const userJSON: string | null = localStorage.getItem('user');
        if (userJSON) {
            return of(JSON.parse(userJSON)).pipe(delay(1000));
        } else {
            //@ts-ignore
            return throwError(() => new HttpErrorResponse({error: '401 unauthorized', status: 401}));
        }
    }

    public signIn(request: SignInRequest): Observable<SignInResponse> {
        // return this.httpClient.post<SignInResponse>(`${this.apiUrl}/sign-in`, request);
        let users = localStorage.getItem('users');
        if (users) {
            let user = JSON.parse(users).find((user: any) => user.login === request.login);
            if (user.password === request.password) {
                localStorage.setItem('user', JSON.stringify(user))
                return of({user: user})
            }
            return throwError(() => new HttpErrorResponse({error: 'Incorrect password', status: 400}));
        }
        return throwError(() => new HttpErrorResponse({error: 'No such user found', status: 400}));
    }

    public signUp(request: SignUpRequest): Observable<SignUpResponse> {
        // return this.httpClient.post<SignUpResponse>(`${this.apiUrl}/sign-up`, request);
        let users = localStorage.getItem('users')
        let user = {name: request.name, login: request.login, uuid: new Date().getTime().toString(), password: request.password};
        if (users) {
            const parsedUsers = JSON.parse(users);
            parsedUsers.push(user);
            localStorage.setItem('users', JSON.stringify(parsedUsers));
        } else {
            localStorage.setItem('users', JSON.stringify([user]))
        }
        localStorage.setItem('user', JSON.stringify(user))
        return of({user: user as User}).pipe(delay(1000));

    }

    public signOut(): Observable<User> {
        // return this.httpClient.post<User>(`${this.apiUrl}/sign-out`, {});
        let user = localStorage.getItem('user');
        if (user) {
            localStorage.removeItem('user');
            return of(JSON.parse(user)).pipe(delay(1000))
        }
        return throwError(() => new HttpErrorResponse({error: 'User is not logged in', status: 400}));
    }
}
