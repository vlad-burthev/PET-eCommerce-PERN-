import { useState, type FC } from "react";

//styles
import styles from "./UIInput.module.scss";

//types
import { UIInputProps } from "./UIInput.props";
import classNames from "classnames";

//icons
import SeachIcon from "./icons/search.svg?react";
import EyeOpenIcon from "./icons/eye-open.svg?react";
import EyeCloseIcon from "./icons/eye-closed.svg?react";

export const UIInput: FC<UIInputProps> = ({
  type = "text",
  styleName,
  maxLength,
  apearence = "default",
  placeholder,
  error,
  ...props
}) => {
  switch (apearence) {
    case "default":
      return (
        <div>
          <input
            placeholder={placeholder}
            type={type}
            className={classNames(
              styles.input,
              styleName && styles[styleName],
              error && styles.error
            )}
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

    case "password":
      const [showPass, setShowPass] = useState(false);
      return (
        <div className={classNames(styles["input-block"], styles[apearence])}>
          <input
            placeholder={placeholder}
            type={showPass ? "text" : "password"}
            className={classNames(
              styles.input,
              error && styles.error,
              styleName && styles[styleName]
            )}
            maxLength={maxLength}
            {...props}
          />

          {showPass ? (
            <EyeOpenIcon
              onClick={() => setShowPass(!showPass)}
              className={classNames(
                styles.icon,
                styles.pass,
                styles[`icon-${apearence}`]
              )}
            />
          ) : (
            <EyeCloseIcon
              onClick={() => setShowPass(!showPass)}
              className={classNames(
                styles.icon,
                styles.pass,
                styles[`icon-${apearence}`]
              )}
            />
          )}
        </div>
      );
  }
};
