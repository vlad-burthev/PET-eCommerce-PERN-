import classNames from "classnames";
import type { FC } from "react";
import { Link } from "react-router-dom";

//styles
import styles from "./UILink.module.scss";

//types
import { UILinkProps } from "./UILink.props";

export const UILink: FC<UILinkProps> = ({
  to,
  children,
  appearance,
  type = "link",
  styleClass,
  ...props
}) => {
  return (
    <Link
      {...props}
      to={to}
      className={classNames(
        styles.link,
        styles[appearance],
        styleClass && styleClass
      )}
    >
      {children}
    </Link>
  );
};
