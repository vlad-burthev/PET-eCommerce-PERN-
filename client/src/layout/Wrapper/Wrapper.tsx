import type { FC } from "react";

//types
import { WrapperProps } from "./Wrapper.props";

//styles
import styles from "./Wrapper.module.scss";

const Wrapper: FC<WrapperProps> = ({ children, ...props }) => {
  return (
    <div className={styles.wrapper} {...props}>
      {children}
    </div>
  );
};

export default Wrapper;
