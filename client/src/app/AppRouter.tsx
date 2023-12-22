import type { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import {
  adminPath,
  cartPath,
  devicePath,
  notFoundPath,
  shopPath,
  signInPath,
  signUpPath,
} from "../utils/constants/routes";
import Admin from "../pages/Admin/Admin";
import Shop from "../pages/Shop/Shop";
import DevicePage from "../pages/DevicePage/DevicePage";
import Cart from "../pages/Cart/Cart";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import NotFound from "../pages/NotFound/NotFound";

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path={shopPath} element={<Layout />}>
        <Route index element={<Shop />} />
        <Route path={adminPath} element={<Admin />} />
        <Route path={devicePath} element={<DevicePage />} />
        <Route path={cartPath} element={<Cart />} />
        <Route path={signInPath} element={<SignIn />} />
        <Route path={signUpPath} element={<SignUp />} />
        <Route path={notFoundPath} element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
