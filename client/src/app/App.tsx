import { FC, useEffect } from "react";
import AppRouter from "./AppRouter";
import { useCheckQuery } from "../services/userAPI";
import { useAppDispatch } from "../store/store";
import { setIsAdmin, setIsLogin, setUser } from "../store/userSlice/userSlice";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  if (token !== undefined && token !== null) {
    const { data, isSuccess } = useCheckQuery(token);

    useEffect(() => {
      data?.user && dispatch(setUser(data.user));
      isSuccess && dispatch(setIsLogin(true));
      data?.user.role === "ADMIN" && dispatch(setIsAdmin(true));

      data?.token && localStorage.setItem("token", data?.token);
    }, [isSuccess]);
  }

  return <AppRouter />;
};

export default App;
