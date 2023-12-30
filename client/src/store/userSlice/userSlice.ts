import { createSlice } from "@reduxjs/toolkit";

interface I_User {
  id: null | number;
  email: null | string;
  image: null | string;
  name: null | string;
  phone: null | string;
  role: null | string;
}

interface I_InitialState {
  isLogin: boolean;
  isAdmin: boolean;
  user: I_User;
}

const initialState: I_InitialState = {
  isLogin: false,
  isAdmin: false,
  user: {
    id: null,
    email: null,
    image: null,
    name: null,
    phone: null,
    role: null,
  },
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = {
        id: payload.id,
        email: payload.email,
        image: payload.image,
        name: payload.name,
        phone: payload.phone,
        role: payload.role,
      };
    },
    setIsLogin: (state, { payload }) => {
      state.isLogin = payload;
    },
    setIsAdmin: (state, { payload }) => {
      state.isAdmin = payload;
    },
    logOut: (state) => {
      localStorage.removeItem("token");
      state.user = initialState.user;
      state.isLogin = initialState.isLogin;
      state.isAdmin = initialState.isAdmin;
    },
  },
});

export const { setUser, setIsLogin, setIsAdmin, logOut } = userSlice.actions;
export default userSlice.reducer;
