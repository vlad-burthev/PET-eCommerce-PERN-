import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface UIInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  type?: "text" | "number";
  apearence?: "defult" | "search" | "password";
  styleName?: string;
  maxLength?: number;
}
