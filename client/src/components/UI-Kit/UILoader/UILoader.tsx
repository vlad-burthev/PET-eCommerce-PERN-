import type { FC } from "react";

interface UILoaderProps {
  hidden?: boolean;
}

//styles
import styles from "./UILoader.module.scss";
import classNames from "classnames";

const UILoader: FC<UILoaderProps> = ({ hidden }) => {
  return (
    <div
      className={classNames(styles.loader, hidden === false && styles.hidden)}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default UILoader;
