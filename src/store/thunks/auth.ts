import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk("auth/loginUser", async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.post(`http://localhost:3000/api/login`, payload);
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
});

export const signUpUser = createAsyncThunk("auth/signUpUser", async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.post(`http://localhost:3000/api/signUp`, payload);
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
});

export const verifyToken = createAsyncThunk("auth/verifyToken", async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.post(`http://localhost:3000/api/auth`, payload);
        return response.data;
    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async (action, { rejectWithValue }) => {
    try {
        return {};
    } catch (err: any) {
        return rejectWithValue(err.response.data);
    }
});
