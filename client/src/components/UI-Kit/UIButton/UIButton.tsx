import type { FC } from "react";

//types
import { UIButtonProps } from "./UIButton.props";

//styles
import styles from "./UIButton.module.scss";
import classNames from "classnames";

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
