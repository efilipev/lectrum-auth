import { combineReducers } from "redux";
import authReducer from "./auth";
import currentUserReducer from "./currentUser";

const combinedReducers = combineReducers({
    auth: authReducer,
    currentContact: currentUserReducer
});

const rootReducer = (state: any, action: any) => {
    return combinedReducers(state, action);
};

export default rootReducer;
