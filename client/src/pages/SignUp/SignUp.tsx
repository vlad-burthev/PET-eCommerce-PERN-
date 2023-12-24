import { useState, type FC, useEffect } from "react";

interface SignUpProps {}

//styles
import styles from "./SignUp.module.scss";
import { UIInput } from "../../components/UI-Kit/UIInput/UIInput";
import classNames from "classnames";
import UIButton from "../../components/UI-Kit/UIButton/UIButton";
import { Link } from "react-router-dom";
import { signInPath } from "../../utils/constants/routes";
import { useRegistrationMutation } from "../../services/userAPI";
import UILoader from "../../components/UI-Kit/UILoader/UILoader";
// import { InputMask } from "@react-input/mask";
import InputMask from "react-input-mask";

import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  setIsAdmin,
  setIsLogin,
  setUser,
} from "../../store/userSlice/userSlice";

const SignUp: FC<SignUpProps> = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const userInforamtion = useAppSelector((state) => state.user);

  console.log(userData);

  const [registration, { data, isSuccess, isLoading, isError, error }]: any =
    useRegistrationMutation();

  const onSubmitHandler = async () => {
    await registration(userData);
  };

  useEffect(() => {
    data?.user && dispatch(setUser(data?.user));
    isSuccess && dispatch(setIsLogin(true));
    data?.user.role === "ADMIN" && dispatch(setIsAdmin(true));
  }, [isSuccess]);

  return (
    <div className={styles["sign-up"]}>
      <h2 className={styles.title}>sign up</h2>
      <div className={styles["input-block"]}>
        <label htmlFor="name">name</label>
        <UIInput
          id="name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          type="text"
          apearence="default"
          placeholder="name"
          error={isError}
        />
      </div>
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
        <label htmlFor="phone">phone</label>

        <InputMask
          mask="+38 (999) 999-99-99"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserData({ ...userData, phone: e.target.value })
          }
        >
          {(inputProps: any) => (
            <UIInput
              id="phone"
              type="text"
              placeholder="+38 (999) 999-99-99"
              className={classNames(
                styles["phone-input"],
                isError ? styles.error : ""
              )}
              apearence="default"
              error={isError}
              {...inputProps}
            />
          )}
        </InputMask>
      </div>
      <div className={styles["input-block"]}>
        <label htmlFor="pass">password</label>
        <UIInput
          id="pass"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          type="password"
          apearence="password"
          placeholder="password"
          error={isError}
        />
      </div>

      <div className={styles.footer}>
        <p className={styles["footer__error"]}>{error?.data.message}</p>

        <UIButton
          onClick={onSubmitHandler}
          appearance="primary"
          styleClass={styles.login}
        >
          <UILoader hidden={isLoading} />
          <span className={isLoading ? styles["btn-title"] : ""}>log in</span>
        </UIButton>
        <p className={styles.sub}>
          already have an account? <Link to={signInPath}>log in</Link> !
        </p>
      </div>
    </div>
  );
};

export default SignUp;
