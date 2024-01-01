import { combineReducers } from "@reduxjs/toolkit";
import { typeAPI } from "../services/typeAPI";
import { userAPI } from "../services/userAPI";
import userSlice from "./userSlice/userSlice";
import { brandAPI } from "../services/brandAPI";
import { deviceAPI } from "../services/deviceAPI";
import deviceSlice from "./deviceSlice/deviceSlice";
import { cartAPI } from "../services/cartAPI";

export const rootReducer = combineReducers({
  [typeAPI.reducerPath]: typeAPI.reducer,
  [brandAPI.reducerPath]: brandAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [deviceAPI.reducerPath]: deviceAPI.reducer,
  [cartAPI.reducerPath]: cartAPI.reducer,
  user: userSlice,
  device: deviceSlice,
});
