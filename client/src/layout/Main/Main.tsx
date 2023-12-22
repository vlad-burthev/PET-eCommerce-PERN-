import type { FC } from "react";

interface MainProps {
  children: React.ReactNode;
}

import styles from "./Main.module.scss";

const Main: FC<MainProps> = ({ children }) => {
  return <main className={styles.main}>{children}</main>;
};

export default Main;
