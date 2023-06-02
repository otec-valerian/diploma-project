export interface User {
    uuid: string;
    name: string;
    login: string;
}
export interface SignInRequest {
    login: string;
    password: string;
}

export interface SignInResponse {
    user: User
}

export interface SignUpRequest {
    login: string;
    name: string;
    password: string;
}

export interface SignUpResponse {
    user: User
}
