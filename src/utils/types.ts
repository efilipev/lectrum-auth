export interface Auth {
    token: string | undefined;
    isAuthenticated: boolean;
    logoutInProgress: boolean;
    signUpInProgress: boolean;
    loginInProgress: boolean;
    verifyTokenInProgress: boolean;
}

export interface Contact {
    id: string;
    name: string;
    email: string;
    password: string;
    created: Date;
}

export interface Store {
    auth: Auth;
    currentContact: Contact | undefined;
}
