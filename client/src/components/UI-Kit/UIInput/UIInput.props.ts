import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface UIInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  type?: "text" | "number" | "password";
  apearence?: "default" | "search" | "password";
  styleName?: string;
  maxLength?: number;
  error?: boolean;
}
