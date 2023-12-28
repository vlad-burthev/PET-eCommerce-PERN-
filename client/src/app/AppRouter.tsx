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
import TypeManagement from "../components/Admin/TypeManagement/TypeManagement";
import BrandManagement from "../components/Admin/BrandManagement/BrandManagement";
import UserManagement from "../components/Admin/UserManagement/UserManagement";
import { useAppSelector } from "../store/store";

const DevicesManagement = lazy(
  () => import("../components/Admin/DevicesManagement/DevicesManagement")
);
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
const SignIn = lazy(() => import("../pages/SignIn/SignIn"));
const SignUp = lazy(() => import("../pages/SignUp/SignUp"));
const Cart = lazy(() => import("../pages/Cart/Cart"));
const DevicePage = lazy(() => import("../pages/DevicePage/DevicePage"));
const Shop = lazy(() => import("../pages/Shop/Shop"));
const Admin = lazy(() => import("../pages/Admin/Admin"));

const AppRouter: FC = () => {
  const { isLogin, isAdmin } = useAppSelector((state) => state.user);

  return (
    <Suspense fallback={false}>
      <Routes>
        <Route path={shopPath} element={<Layout />}>
          <Route index element={<Shop />} />
          {isAdmin && (
            <Route path={adminPath} element={<Admin />}>
              <Route path="devices" element={<DevicesManagement />} />
              <Route path="types" element={<TypeManagement />} />
              <Route path="brands" element={<BrandManagement />} />
              <Route path="users" element={<UserManagement />} />
            </Route>
          )}

          {isLogin && <Route path={cartPath} element={<Cart />} />}

          <Route path={devicePath + ":slug"} element={<DevicePage />} />
          <Route path={signInPath} element={<SignIn />} />
          <Route path={signUpPath} element={<SignUp />} />
          <Route path={notFoundPath} element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
