import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

//root(combine) reducer
import { rootReducer } from "./rootReducer";

//api
import { typeAPI } from "../services/typeAPI";
import { userAPI } from "../services/userAPI";
import { brandAPI } from "../services/brandAPI";
import { deviceAPI } from "../services/deviceAPI";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      typeAPI.middleware,
      userAPI.middleware,
      brandAPI.middleware,
      deviceAPI.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
