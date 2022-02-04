import {createStore} from "@reduxjs/toolkit";
import {RootReducter} from "../Reducer/RootReducter";

export const Store = createStore(RootReducter);