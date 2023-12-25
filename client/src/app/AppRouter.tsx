import { lazy, type FC, Suspense } from "react";
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
import Loading from "../pages/Loading/Loading";
import TypeManagment from "../components/Admin/TypeManagment/TypeManagment";
import BrandManagment from "../components/Admin/BrandManagment/BrandManagment";

const DevicesManagment = lazy(
  () => import("../components/Admin/DevicesManagment/DevicesManagment")
);
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
const SignIn = lazy(() => import("../pages/SignIn/SignIn"));
const SignUp = lazy(() => import("../pages/SignUp/SignUp"));
const Cart = lazy(() => import("../pages/Cart/Cart"));
const DevicePage = lazy(() => import("../pages/DevicePage/DevicePage"));
const Shop = lazy(() => import("../pages/Shop/Shop"));
const Admin = lazy(() => import("../pages/Admin/Admin"));

const AppRouter: FC = () => {
  return (
    <Suspense fallback={false}>
      <Routes>
        <Route path={shopPath} element={<Layout />}>
          <Route index element={<Shop />} />
          <Route path={adminPath} element={<Admin />}>
            <Route path="devices" element={<DevicesManagment />} />
            <Route path="types" element={<TypeManagment />} />
            <Route path="brands" element={<BrandManagment />} />
            <Route path="users" element={<h1>users</h1>} />
          </Route>
          <Route path={devicePath} element={<DevicePage />} />
          <Route path={cartPath} element={<Cart />} />
          <Route path={signInPath} element={<SignIn />} />
          <Route path={signUpPath} element={<SignUp />} />
          <Route path={notFoundPath} element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
