import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DesignPropertiesViews, ReactCode } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
import { GridGroup } from "../sidebar/groups/grid-group";
import { HtmlGroup } from "../sidebar/groups/html-group";
import { LabelGroup } from "../sidebar/groups/label-group";
import { InputGroup } from "../sidebar/groups/input-group";
import { OptionsGroup } from "../sidebar/groups/options-group";
import { SettingsGroup } from "../sidebar/groups/settings-group";
import { ValidationGroup } from "../sidebar/groups/validation-group";
import { escapeHtml } from "@/lib/utils";
import { ControllerRenderProps, FieldValues, UseFormReturn } from "react-hook-form";
import { getComponentId, getSetting, compactTemplate } from "./shared";

export function getToggleGroupConfig(component: FormComponentModel) {
  return {
    multiple: getSetting(component, "multiple", "no") === "yes",
    variant:
      component.getField("properties.variant") === "outline"
        ? ("outline" as const)
        : ("default" as const),
    size: getSetting(component, "size", "default"),
  };
}

/** Checked options are the default selection; single mode keeps the first. */
export function getToggleGroupDefaultValue(
  component: FormComponentModel
): string | string[] {
  const { multiple } = getToggleGroupConfig(component);
  const checked = (component.options ?? [])
    .filter((option) => option.checked)
    .map((option) => option.value);
  return multiple ? checked : checked[0] ?? "";
}

export function FormToggleGroup(
  component: FormComponentModel,
  form: UseFormReturn<FieldValues, undefined>,
  field: ControllerRenderProps
) {
  const { multiple, variant, size } = getToggleGroupConfig(component);
  // Base UI's ToggleGroup always works with an array of pressed values
  const value: string[] = Array.isArray(field.value)
    ? field.value
    : field.value
      ? [field.value]
      : [];

  return (
    <ToggleGroup
      key={component.id}
      id={getComponentId(component)}
      className={component.getField("attributes.class")}
      multiple={multiple}
      variant={variant}
      size={size}
      value={value}
      onValueChange={(next) => field.onChange(multiple ? next : next[0] ?? "")}
    >
      {component.options?.map((option) => (
        <ToggleGroupItem key={option.value} value={option.value}>
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export function getReactCode(component: FormComponentModel): ReactCode {
  const { multiple, variant, size } = getToggleGroupConfig(component);
  const className = component.getField("attributes.class");
  const items = (component.options ?? [])
    .map(
      (option) => `
        <ToggleGroupItem value="${escapeHtml(option.value)}">
          ${escapeHtml(option.label)}
        </ToggleGroupItem>`
    )
    .join("");

  return {
    template: compactTemplate(`
    <ToggleGroup
      id="${escapeHtml(getComponentId(component))}"
      ${className ? `className="${escapeHtml(className)}"` : ""}
      ${multiple ? "multiple" : ""}
      variant="${variant}"
      size="${size}"
      ${
        multiple
          ? `value={field.value}
      onValueChange={field.onChange}`
          : `value={field.value ? [field.value] : []}
      onValueChange={(value) => field.onChange(value[0] ?? "")}`
      }
    >${items}
    </ToggleGroup>
    `),
    dependencies: {
      "@/components/ui/toggle-group": ["ToggleGroup", "ToggleGroupItem"],
    },
  };
}

export const ToggleGroupDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  html: <HtmlGroup />,
  label: <LabelGroup whitelist={["label", "labelPosition", "labelAlign", "showLabel"]} />,
  input: <InputGroup whitelist={["description"]} />,
  settings: (
    <SettingsGroup
      fields={[
        {
          kind: "toggle",
          path: "properties.settings.multiple",
          label: "Multiple",
          options: [
            { value: "yes", label: "yes" },
            { value: "no", label: "no" },
          ],
        },
        {
          kind: "select",
          path: "properties.variant",
          label: "Variant",
          options: [
            { value: "outline", label: "Outline" },
            { value: "default", label: "Default" },
          ],
        },
        {
          kind: "select",
          path: "properties.settings.size",
          label: "Size",
          options: [
            { value: "sm", label: "Small" },
            { value: "default", label: "Default" },
            { value: "lg", label: "Large" },
          ],
        },
      ]}
    />
  ),
  options: <OptionsGroup />,
  button: null,
  validation: <ValidationGroup />,
};
