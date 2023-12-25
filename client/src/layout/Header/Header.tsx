import type { FC } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";

//styles
import styles from "./Header.module.scss";

// routes
import {
  adminPath,
  cartPath,
  shopPath,
  signInPath,
  signUpPath,
} from "../../utils/constants/routes";

//components
import { UIContainer } from "../../components/UI-Kit/UIContainer/UIContainer";
import { UIInput } from "../../components/UI-Kit/UIInput/UIInput";
import { UILink } from "../../components/UI-Kit/UILink/UILink";

//icons
import ShopIcon from "../../assets/images/shopIcon.svg?react";
import CartIcon from "../../assets/images/cartIcon.svg?react";
import { UIButton } from "../../components/UI-Kit/UIButton/UIButton";
import {
  logOut,
  setIsAdmin,
  setIsLogin,
} from "../../store/userSlice/userSlice";

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const logOutHandler = () => {
    dispatch(logOut());
    dispatch(setIsLogin(false));
    dispatch(setIsAdmin(false));
  };

  const { isLogin, isAdmin } = useAppSelector((state) => state.user);

  return (
    <header className={styles.header}>
      <UIContainer>
        <div className={styles.content}>
          <div className={styles.logo}>
            <Link to={shopPath} className={styles.title}>
              [PET]<span>eCommerce</span>
            </Link>
          </div>

          <div className={styles.search}>
            <UIInput
              placeholder="enter device name, type, brand..."
              type="text"
              apearence="search"
            />
          </div>

          <div className={styles["btn-box"]}>
            <UILink
              styleClass={styles["shop-link"]}
              to={shopPath}
              appearance="ghost"
            >
              shop
              <ShopIcon />
            </UILink>

            {isLogin ? (
              <>
                <UILink
                  styleClass={styles["shop-link"]}
                  to={cartPath}
                  appearance="ghost"
                >
                  cart <CartIcon />
                </UILink>

                <UIButton onClick={logOutHandler} appearance="danger">
                  log out
                </UIButton>

                {isAdmin && (
                  <UILink to={adminPath} appearance="warning">
                    admin
                  </UILink>
                )}
              </>
            ) : (
              <div>
                <UILink
                  to={signInPath}
                  styleClass={styles["login-btn"]}
                  appearance="primary"
                >
                  sign-in
                </UILink>
                <UILink to={signUpPath} appearance="ghost">
                  sign-up
                </UILink>
              </div>
            )}
          </div>
        </div>
      </UIContainer>
    </header>
  );
};

export default Header;
