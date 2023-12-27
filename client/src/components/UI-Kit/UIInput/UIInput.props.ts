import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface UIInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  type?: "text" | "number" | "password" | "file";
  apearence?: "default" | "search" | "password" | "warning";
  styleName?: string;
  maxLength?: number;
  error?: boolean;
}
