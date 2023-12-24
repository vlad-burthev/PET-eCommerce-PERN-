import type { FC } from "react";
import classNames from "classnames";

//types
import { UIButtonProps } from "./UIButton.props";

//styles
import styles from "./UIButton.module.scss";

const UIButton: FC<UIButtonProps> = ({
  children,
  appearance,
  styleClass,
  ...props
}) => {
  return (
    <button
      className={classNames(
        styles.btn,
        styles[appearance],
        styleClass && styleClass
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default UIButton;
