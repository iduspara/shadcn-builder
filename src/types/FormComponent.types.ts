import { icons } from "lucide-react";
import { Viewports } from "./form-builder.types";
import { HTMLAttributes, HTMLInputTypeAttribute } from "react";

export type FormComponentTypes =
  | "text"
  | "input"
  | "textarea"
  | "number"
  | "email"
  | "password"
  | "file"
  | "tel"
  | "url"
  | "select"
  | "checkbox"
  | "checkbox-group"
  | "radio"
  | "date"
  | "switch"
  | "button"
  | "submit-button"
  | "reset-button"
  | "credit-card";
export interface FormComponentModelInput {
  id: string;
  label: string;
  label_info: string;
  label_description?: string;
  type: FormComponentTypes;
  category: "form" | "content";
  icon: keyof typeof icons;
  properties?: FormComponentProperties;
  content?: string;
  description?: string;
  value?: string | number;
  attributes?: FormComponentAttributes;
  overrides?: FormComponentOverrides;
  options?: { label: string; labelDescription?: string; value: string; checked?: boolean }[];
  validations?: FormComponentValidationTypes;
}

export type FormComponentProperties = {
  style?: FormComponentStyles;
  variant?:
    | "default"
    | "outline"
    | "ghost"
    | "link"
    | "secondary"
    | "destructive";
};

export interface FormComponentStyles {
  asCard?: "yes" | "no";
  cardLayout?: "horizontal" | "vertical";
  showLabel?: "yes" | "no";
  visible?: "yes" | "no";
  labelPosition?: "top" | "left" | "right";
  labelAlign?: "start" | "center" | "end";
  textAlign?: "left" | "center" | "right";
  colSpan?:
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12";
  colStart?:
    | "auto"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12";
  flexAlign?: "start" | "center" | "end";
  icon?: keyof typeof icons | "";
  iconPosition?: "left" | "right";
  iconStrokeWidth?: number;
}

export type FormComponentAttributes = Partial<HTMLAttributes<HTMLElement>> & {
  id?: string;
  type?: HTMLInputTypeAttribute;
  name?: string;
  class?: string;
  value?: string | number | readonly string[];
  checked?: boolean;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
};

export type FormComponentOverrides = {
  [key in Viewports]?: Omit<FormComponentModelInput, "overrides">;
};

export interface FormComponentValidationTypes {
  required?: "yes" | "no";
  min?: number | string;
  max?: number | string;
  minLength?: number | string;
  maxLength?: number | string;
  contains?: string;
  notContains?: string;
  greater?: number | string;
  lower?: number | string;
  equals?: number | string;
  notEquals?: number | string;
  greaterEqual?: number | string;
  lowerEqual?: number | string;
  email?: boolean;
  url?: boolean;
}
