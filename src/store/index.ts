import { configureStore, ThunkDispatch, Action } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import rootReducer from "./slices";

const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;

export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;

export const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();

export default store;
