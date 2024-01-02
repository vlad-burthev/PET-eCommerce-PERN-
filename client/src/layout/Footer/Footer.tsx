import type { FC } from "react";

interface FooterProps {}

import styles from "./Footer.module.scss";
import { UIContainer } from "../../components/UI-Kit/UIContainer/UIContainer";

const Footer: FC<FooterProps> = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <UIContainer>
        <div>
          <p>&copy; {currentYear} Vlad Burtsev. All rights reserved.</p>
        </div>
      </UIContainer>
    </footer>
  );
};

export default Footer;
