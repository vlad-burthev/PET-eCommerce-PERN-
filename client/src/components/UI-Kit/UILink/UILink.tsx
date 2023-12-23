import classNames from "classnames";
import type { FC } from "react";
import { Link } from "react-router-dom";

//styles
import styles from "./UILink.module.scss";

//types
import { UILinkProps } from "./UILink.props";

export const UILink: FC<UILinkProps> = ({
  path,
  children,
  apearence,
  ...props
}) => {
  return (
    <Link
      {...props}
      to={path}
      className={classNames(styles.link, styles[apearence])}
    >
      {children}
    </Link>
  );
};
