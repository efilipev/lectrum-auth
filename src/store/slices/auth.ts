import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import memoize from "proxy-memoize";

import { loginUser, logoutUser, signUpUser, verifyToken } from "store/thunks/auth";

import { Auth, Store } from "utils/types";

const initialState: Auth = {
    token: undefined,
    isAuthenticated: false,
    loginInProgress: false,
    signUpInProgress: false,
    logoutInProgress: false,
    verifyTokenInProgress: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoggedInUser: (state: Auth, action: PayloadAction<any>) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.loginInProgress = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state: Auth) => {
            state.loginInProgress = true;
        });
        builder.addCase(loginUser.fulfilled, (state: Auth, action: PayloadAction<any>) => {
            localStorage.setItem("auth", JSON.stringify(action.payload));
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.loginInProgress = false;
        });
        builder.addCase(loginUser.rejected, (state: Auth) => {
            state.loginInProgress = false;
        });
        builder.addCase(signUpUser.pending, (state: Auth) => {
            state.signUpInProgress = true;
        });
        builder.addCase(signUpUser.fulfilled, (state: Auth, action) => {
            localStorage.setItem("auth", JSON.stringify(action.payload));
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.signUpInProgress = false;
        });
        builder.addCase(signUpUser.rejected, (state: Auth) => {
            state.signUpInProgress = false;
        });
        builder.addCase(verifyToken.pending, (state: Auth) => {
            state.verifyTokenInProgress = true;
        });
        builder.addCase(verifyToken.fulfilled, (state: Auth, action) => {
            state.isAuthenticated = action.payload.isValid;
            state.verifyTokenInProgress = false;
        });
        builder.addCase(verifyToken.rejected, (state: Auth) => {
            state.verifyTokenInProgress = false;
        });
        builder.addCase(logoutUser.pending, (state: Auth) => {
            state.logoutInProgress = true;
        });
        builder.addCase(logoutUser.fulfilled, (state: Auth) => {
            localStorage.removeItem("auth");
            state.isAuthenticated = false;
            state.token = undefined;
            state.logoutInProgress = false;
        });
        builder.addCase(logoutUser.rejected, (state: Auth) => {
            state.logoutInProgress = false;
        });
    }
});

export const getIsAuthenticated = memoize((state: Store) => state.auth.isAuthenticated);
export const getIsLoginInProgress = memoize((state: Store) => state.auth.loginInProgress);

export const getIsSignUpInProgress = memoize((state: Store) => state.auth.signUpInProgress);

export const getIsVerifyTokenInProgress = memoize((state: Store) => state.auth.verifyTokenInProgress);

export const getLogoutInProgress = memoize((state: Store) => state.auth.logoutInProgress);

export const { setLoggedInUser } = authSlice.actions;

export default authSlice.reducer;
