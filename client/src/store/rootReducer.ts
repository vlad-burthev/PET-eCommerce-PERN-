import { combineReducers } from "@reduxjs/toolkit";
import { typeAPI } from "../services/typeAPI";
import { userAPI } from "../services/userAPI";
import userSlice from "./userSlice/userSlice";

export const rootReducer = combineReducers({
  [typeAPI.reducerPath]: typeAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  user: userSlice,
});
