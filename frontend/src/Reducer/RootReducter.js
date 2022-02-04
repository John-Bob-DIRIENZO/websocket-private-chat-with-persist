import {combineReducers} from "@reduxjs/toolkit";
import SigninReducer from "./SigninReducer";
import WebsocketReducer from "./WebsocketReducer";
import SessionReducer from "./SessionReducer";

export const RootReducter = combineReducers({
    SigninReducer,
    WebsocketReducer,
    SessionReducer
});