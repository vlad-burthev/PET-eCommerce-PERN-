import { LinkProps } from "react-router-dom";

export interface UILinkProps extends LinkProps {
  path: string;
  apearence: "ghost" | "primary" | "warning" | "danger" | "disabled";
  children: React.ReactNode;
}
