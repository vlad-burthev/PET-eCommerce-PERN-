import type { FC } from "react";
import { Link } from "react-router-dom";

//styles
import styles from "./Header.module.scss";

// routes
import { shopPath } from "../../utils/constants/routes";

//components
import { UIContainer } from "../../components/UI-Kit/UIContainer/UIContainer";
import { UIInput } from "../../components/UI-Kit/UIInput/UIInput";
import UIButton from "../../components/UI-Kit/UIButton/UIButton";

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

          <div>
            <UIInput
              placeholder="Enter device name, type, brand..."
              type="text"
              apearence="search"
            />
          </div>

          <div className={styles["btn-box"]}>
            <UIButton styleClass={styles["login-btn"]} appearance="primary">
              sign-in
            </UIButton>
            <UIButton appearance="ghost">sign-up</UIButton>
          </div>
        </div>
      </UIContainer>
    </header>
  );
};

export default Header;
