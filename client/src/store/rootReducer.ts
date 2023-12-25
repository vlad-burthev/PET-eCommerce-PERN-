import { combineReducers } from "@reduxjs/toolkit";
import { typeAPI } from "../services/typeAPI";
import { userAPI } from "../services/userAPI";
import userSlice from "./userSlice/userSlice";
import { brandAPI } from "../services/brandAPI";

export const rootReducer = combineReducers({
  [typeAPI.reducerPath]: typeAPI.reducer,
  [brandAPI.reducerPath]: brandAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  user: userSlice,
});
