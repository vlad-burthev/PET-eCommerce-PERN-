import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface UIButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  appearance: string;
  styleClass?: string;
}
