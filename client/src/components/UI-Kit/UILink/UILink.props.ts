import { LinkProps } from "react-router-dom";

export interface UILinkProps extends LinkProps {
  to: string;
  appearance: "ghost" | "primary" | "warning" | "danger" | "disabled";
  children: React.ReactNode;
  styleClass?: string;
}
