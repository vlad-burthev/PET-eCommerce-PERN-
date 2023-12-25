import type { FC } from "react";

//styles
import styles from "./Loading.module.scss";
import UILoader from "../../components/UI-Kit/UILoader/UILoader";

const Loading: FC = () => {
  return (
    <div className={styles.loading}>
      <UILoader />
    </div>
  );
};

export default Loading;
