import type { FC } from "react";

//styles
import styles from "./UIContainer.module.scss";

interface UIContainerProps {
  children: React.ReactNode;
}

export const UIContainer: FC<UIContainerProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
