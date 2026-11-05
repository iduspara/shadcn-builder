import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { DesignPropertiesViews, ReactCode } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
import { GridGroup } from "../sidebar/groups/grid-group";
import { HtmlGroup } from "../sidebar/groups/html-group";
import { LabelGroup } from "../sidebar/groups/label-group";
import { InputGroup } from "../sidebar/groups/input-group";
import { SettingsGroup } from "../sidebar/groups/settings-group";
import { ValidationGroup } from "../sidebar/groups/validation-group";
import { escapeHtml } from "@/lib/utils";
import { ControllerRenderProps, FieldValues, UseFormReturn } from "react-hook-form";
import { getComponentId, getSetting, compactTemplate } from "./shared";

const PATTERNS = {
  digits: { regexp: REGEXP_ONLY_DIGITS, name: "REGEXP_ONLY_DIGITS" },
  alphanumeric: {
    regexp: REGEXP_ONLY_DIGITS_AND_CHARS,
    name: "REGEXP_ONLY_DIGITS_AND_CHARS",
  },
} as const;

export function getInputOtpConfig(component: FormComponentModel) {
  const length = Math.min(
    Math.max(Math.round(Number(getSetting(component, "length", 6))) || 6, 1),
    12
  );
  const pattern = getSetting(component, "pattern", "digits");
  return {
    length,
    pattern: pattern === "any" ? undefined : PATTERNS[pattern],
  };
}

export function FormInputOtp(
  component: FormComponentModel,
  form: UseFormReturn<FieldValues, undefined>,
  field: ControllerRenderProps
) {
  const { length, pattern } = getInputOtpConfig(component);

  return (
    <InputOTP
      key={`${component.id}-${length}`}
      id={getComponentId(component)}
      name={field.name}
      maxLength={length}
      pattern={pattern?.regexp}
      value={field.value ?? ""}
      onChange={field.onChange}
      onBlur={field.onBlur}
      containerClassName={component.getField("attributes.class")}
    >
      <InputOTPGroup>
        {Array.from({ length }, (_, index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}

export function getReactCode(component: FormComponentModel): ReactCode {
  const { length, pattern } = getInputOtpConfig(component);
  const slots = Array.from(
    { length },
    (_, index) => `<InputOTPSlot index={${index}} />`
  ).join("\n");
  const containerClass = component.getField("attributes.class");

  return {
    template: compactTemplate(`
    <InputOTP
      id="${escapeHtml(getComponentId(component))}"
      name={field.name}
      maxLength={${length}}
      ${pattern ? `pattern={${pattern.name}}` : ""}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      ${containerClass ? `containerClassName="${escapeHtml(containerClass)}"` : ""}
    >
      <InputOTPGroup>
        ${slots}
      </InputOTPGroup>
    </InputOTP>
    `),
    dependencies: {
      "@/components/ui/input-otp": ["InputOTP", "InputOTPGroup", "InputOTPSlot"],
      ...(pattern && { "input-otp": [pattern.name] }),
    },
  };
}

export const InputOtpDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  html: <HtmlGroup />,
  label: <LabelGroup whitelist={["label", "labelPosition", "labelAlign", "showLabel"]} />,
  input: <InputGroup whitelist={["description"]} />,
  settings: (
    <SettingsGroup
      fields={[
        { kind: "number", path: "properties.settings.length", label: "Length", min: 1, step: 1 },
        {
          kind: "select",
          path: "properties.settings.pattern",
          label: "Allowed characters",
          options: [
            { value: "digits", label: "Digits" },
            { value: "alphanumeric", label: "Letters & digits" },
            { value: "any", label: "Any" },
          ],
        },
      ]}
    />
  ),
  options: null,
  button: null,
  validation: <ValidationGroup />,
};
