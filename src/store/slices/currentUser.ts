import { createSlice } from "@reduxjs/toolkit";
import memoize from "proxy-memoize";

import { Auth, Store, Contact } from "utils/types";
import { loginUser, logoutUser, signUpUser } from "../thunks/auth";

const initialState: Contact | undefined = {
    contact: undefined
};

const currentContactSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        setContact: (state: Contact, action) => {
            state.contact = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUpUser.fulfilled, (state: Contact, action) => {
            state.contact = action.payload.user;
        });
        builder.addCase(loginUser.fulfilled, (state: Contact, action) => {
            state.contact = action.payload.user;
        });
        builder.addCase(logoutUser.fulfilled, (state: Auth) => {
            state.contact = undefined;
        });
    }
});

export const getCurrentContact = memoize((state: Store) => state.currentContact?.contact);

export const { setContact } = currentContactSlice.actions;

export default currentContactSlice.reducer;
