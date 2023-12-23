import { combineReducers } from "@reduxjs/toolkit";
import { typeAPI } from "../services/typeAPI";

export const rootReducer = combineReducers({
  [typeAPI.reducerPath]: typeAPI.reducer,
});
