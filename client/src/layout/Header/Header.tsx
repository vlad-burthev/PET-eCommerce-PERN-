import type { FC } from "react";
import { Link } from "react-router-dom";

//styles
import styles from "./Header.module.scss";

// routes
import { shopPath, signInPath, signUpPath } from "../../utils/constants/routes";

//components
import { UIContainer } from "../../components/UI-Kit/UIContainer/UIContainer";
import { UIInput } from "../../components/UI-Kit/UIInput/UIInput";
import { UILink } from "../../components/UI-Kit/UILink/UILink";

const Header: FC = () => {
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
        </div>
      </UIContainer>
    </header>
  );
};

export default Header;
