import type { FC } from "react";

interface FooterProps {}

import styles from "./Footer.module.scss";
import { UIContainer } from "../../components/UI-Kit/UIContainer/UIContainer";

const Footer: FC<FooterProps> = () => {
  return (
    <footer className={styles.footer}>
      <UIContainer>footer</UIContainer>
    </footer>
  );
};

export default Footer;
