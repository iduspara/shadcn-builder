import {
  InputGroup as UIInputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
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
import { Icon } from "../helpers/icon-render";
import { getComponentId, getSetting, compactTemplate } from "./shared";

function getInputGroupConfig(component: FormComponentModel) {
  return {
    prefix: getSetting(component, "prefix", ""),
    suffix: getSetting(component, "suffix", ""),
    prefixIcon: getSetting(component, "prefixIcon", ""),
    suffixIcon: getSetting(component, "suffixIcon", ""),
    addonButton: getSetting(component, "addonButton", ""),
  };
}

export function FormInputGroup(
  component: FormComponentModel,
  form: UseFormReturn<FieldValues, undefined>,
  field: ControllerRenderProps
) {
  const { prefix, suffix, prefixIcon, suffixIcon, addonButton } =
    getInputGroupConfig(component);

  return (
    <UIInputGroup key={component.id} className={component.getField("attributes.class")}>
      {(prefixIcon || prefix) && (
        <InputGroupAddon align="inline-start">
          {prefixIcon && <Icon name={prefixIcon} className="size-4" strokeWidth={2} />}
          {prefix && <InputGroupText>{prefix}</InputGroupText>}
        </InputGroupAddon>
      )}
      <InputGroupInput
        id={getComponentId(component)}
        placeholder={component.getField("attributes.placeholder")}
        {...field}
        value={field.value ?? ""}
      />
      {(suffix || suffixIcon || addonButton) && (
        <InputGroupAddon align="inline-end">
          {suffix && <InputGroupText>{suffix}</InputGroupText>}
          {suffixIcon && <Icon name={suffixIcon} className="size-4" strokeWidth={2} />}
          {addonButton && (
            <InputGroupButton variant="secondary">{addonButton}</InputGroupButton>
          )}
        </InputGroupAddon>
      )}
    </UIInputGroup>
  );
}

export function getReactCode(component: FormComponentModel): ReactCode {
  const { prefix, suffix, prefixIcon, suffixIcon, addonButton } =
    getInputGroupConfig(component);
  const className = component.getField("attributes.class");
  const icons = [prefixIcon, suffixIcon].filter(Boolean);

  const startAddon =
    prefixIcon || prefix
      ? `<InputGroupAddon align="inline-start">
          ${prefixIcon ? `<${prefixIcon} />` : ""}
          ${prefix ? `<InputGroupText>${escapeHtml(prefix)}</InputGroupText>` : ""}
        </InputGroupAddon>`
      : "";
  const endAddon =
    suffix || suffixIcon || addonButton
      ? `<InputGroupAddon align="inline-end">
          ${suffix ? `<InputGroupText>${escapeHtml(suffix)}</InputGroupText>` : ""}
          ${suffixIcon ? `<${suffixIcon} />` : ""}
          ${
            addonButton
              ? `<InputGroupButton variant="secondary">${escapeHtml(addonButton)}</InputGroupButton>`
              : ""
          }
        </InputGroupAddon>`
      : "";

  return {
    template: compactTemplate(`
    <InputGroup ${className ? `className="${escapeHtml(className)}"` : ""}>
      ${startAddon}
      <InputGroupInput
        id="${escapeHtml(getComponentId(component))}"
        placeholder="${escapeHtml(component.getField("attributes.placeholder"))}"
        {...field}
      />
      ${endAddon}
    </InputGroup>
    `),
    dependencies: {
      "@/components/ui/input-group": [
        "InputGroup",
        "InputGroupInput",
        "InputGroupAddon",
        ...(prefix || suffix ? ["InputGroupText"] : []),
        ...(addonButton ? ["InputGroupButton"] : []),
      ],
      ...(icons.length > 0 && { "lucide-react": icons }),
    },
  };
}

export const InputGroupDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  html: <HtmlGroup />,
  label: <LabelGroup whitelist={["label", "labelPosition", "labelAlign", "showLabel"]} />,
  input: <InputGroup whitelist={["placeholder", "description", "value"]} />,
  settings: (
    <SettingsGroup
      fields={[
        { kind: "text", path: "properties.settings.prefix", label: "Prefix text", placeholder: "https://" },
        { kind: "icon", path: "properties.settings.prefixIcon", label: "Prefix icon" },
        { kind: "text", path: "properties.settings.suffix", label: "Suffix text", placeholder: ".com" },
        { kind: "icon", path: "properties.settings.suffixIcon", label: "Suffix icon" },
        { kind: "text", path: "properties.settings.addonButton", label: "Button label" },
      ]}
    />
  ),
  options: null,
  button: null,
  validation: <ValidationGroup />,
};
