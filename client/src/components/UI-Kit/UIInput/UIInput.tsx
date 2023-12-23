import type { FC } from "react";

//styles
import styles from "./UIInput.module.scss";

//types
import { UIInputProps } from "./UIInput.props";
import classNames from "classnames";

//icons
import SeachIcon from "./icons/search.svg?react";

export const UIInput: FC<UIInputProps> = ({
  type = "text",
  styleName,
  maxLength,
  apearence = "default",
  placeholder,
  ...props
}) => {
  switch (apearence) {
    case "default":
      return (
        <div>
          <input
            placeholder={placeholder}
            type={type}
            className={classNames(styles.input, styleName && styles[styleName])}
            maxLength={maxLength}
            {...props}
          />
        </div>
      );

    case "search":
      return (
        <div className={classNames(styles["input-block"], styles[apearence])}>
          <input
            placeholder={placeholder}
            type={type}
            className={classNames(styles.input, styleName && styles[styleName])}
            maxLength={maxLength}
            {...props}
          />

          <SeachIcon
            className={classNames(styles.icon, styles[`icon-${apearence}`])}
          />
        </div>
      );
  }
};
