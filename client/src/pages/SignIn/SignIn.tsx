import { useState, type FC, useEffect } from "react";
import classNames from "classnames";

//styles
import styles from "./SignIn.module.scss";

//components
import { UIInput } from "../../components/UI-Kit/UIInput/UIInput";
import { UIButton } from "../../components/UI-Kit/UIButton/UIButton";
import { Link, useNavigate } from "react-router-dom";
import UILoader from "../../components/UI-Kit/UILoader/UILoader";

//paths
import { shopPath, signUpPath } from "../../utils/constants/routes";
import { useLoginMutation } from "../../services/userAPI";
import { useAppDispatch } from "../../store/store";
import {
  setIsAdmin,
  setIsLogin,
  setUser,
} from "../../store/userSlice/userSlice";

const SignIn: FC = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const [login, { data, isSuccess, isLoading, isError, error }]: any =
    useLoginMutation();

  const navigate = useNavigate();

  const onSubmitHandler = async () => {
    await login(userData);
  };

  useEffect(() => {
    data?.user && dispatch(setUser(data.user));
    isSuccess && dispatch(setIsLogin(true));
    data?.user.role === "ADMIN" && dispatch(setIsAdmin(true));
    data?.token && localStorage.setItem("token", data?.token);
    if (isSuccess) {
      navigate(shopPath);
    }
  }, [isSuccess]);

  return (
    <div className={styles["sign-in"]}>
      <h2 className={styles.title}>log in</h2>

      <div className={styles["input-block"]}>
        <label htmlFor="email">email</label>
        <UIInput
          id="email"
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          value={userData.email}
          type="text"
          placeholder="email"
          error={isError}
        />
      </div>
      <div className={classNames(styles["input-block"])}>
        <label htmlFor="pass">password</label>
        <UIInput
          id="pass"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          type="text"
          apearence="password"
          placeholder="password"
          error={isError}
        />
      </div>

      <div className={styles.footer}>
        <p className={styles["footer__error"]}>
          {error && error?.data?.message}
        </p>

        <UIButton
          onClick={onSubmitHandler}
          appearance="primary"
          styleClass={styles.login}
        >
          <UILoader hidden={isLoading} />
          <span className={isLoading ? styles["btn-title"] : ""}>log in</span>
        </UIButton>
        <p className={styles.sub}>
          no account yet? <Link to={signUpPath}>sign up</Link> !
        </p>
      </div>
    </div>
  );
};

export default SignIn;
