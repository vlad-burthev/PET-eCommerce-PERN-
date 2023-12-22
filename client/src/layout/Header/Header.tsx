import type { FC } from "react";

interface HeaderProps {}

import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { shopPath } from "../../utils/constants/routes";

const Header: FC<HeaderProps> = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <Link to={shopPath} className={styles.title}>
              [PET]<span>eCommerce</span>
            </Link>
          </div>

          <div></div>

          <div></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
