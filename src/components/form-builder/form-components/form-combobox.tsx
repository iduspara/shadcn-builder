import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { DesignPropertiesViews, ReactCode } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
import { GridGroup } from "../sidebar/groups/grid-group";
import { HtmlGroup } from "../sidebar/groups/html-group";
import { LabelGroup } from "../sidebar/groups/label-group";
import { InputGroup } from "../sidebar/groups/input-group";
import { OptionsGroup } from "../sidebar/groups/options-group";
import { ValidationGroup } from "../sidebar/groups/validation-group";
import { cn, escapeHtml } from "@/lib/utils";
import { ControllerRenderProps, FieldValues, UseFormReturn } from "react-hook-form";
import { getComponentId, toJsLiteral, compactTemplate } from "./shared";

const EMPTY_TEXT = "No results found.";

/** Option values in order, plus a value -> label map for display and filtering. */
function getComboboxData(component: FormComponentModel) {
  const options = component.options ?? [];
  return {
    values: options.map((option) => option.value),
    labels: Object.fromEntries(
      options.map((option) => [option.value, option.label])
    ) as Record<string, string>,
  };
}

export function FormCombobox(
  component: FormComponentModel,
  form: UseFormReturn<FieldValues, undefined>,
  field: ControllerRenderProps
) {
  const { values, labels } = getComboboxData(component);

  return (
    <Combobox
      key={component.id}
      items={values}
      value={field.value || null}
      onValueChange={(value) => field.onChange(value ?? "")}
      itemToStringLabel={(value: string) => labels[value] ?? value}
      name={field.name}
    >
      <ComboboxInput
        id={getComponentId(component)}
        placeholder={component.getField("attributes.placeholder")}
        className={cn("w-full", component.getField("attributes.class"))}
        onBlur={field.onBlur}
      />
      <ComboboxContent>
        <ComboboxEmpty>{EMPTY_TEXT}</ComboboxEmpty>
        <ComboboxList>
          {(value: string) => (
            <ComboboxItem key={value} value={value}>
              {labels[value] ?? value}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export function getReactCode(component: FormComponentModel): ReactCode {
  const { values, labels } = getComboboxData(component);
  const labelsLiteral = toJsLiteral(labels);

  return {
    template: compactTemplate(`
    <Combobox
      key="${component.id}"
      items={${toJsLiteral(values)}}
      value={field.value || null}
      onValueChange={(value) => field.onChange(value ?? "")}
      itemToStringLabel={(value: string) => (${labelsLiteral} as Record<string, string>)[value] ?? value}
      name={field.name}
    >
      <ComboboxInput
        id="${escapeHtml(getComponentId(component))}"
        placeholder="${escapeHtml(component.getField("attributes.placeholder"))}"
        className="${escapeHtml(cn("w-full", component.getField("attributes.class")))}"
        onBlur={field.onBlur}
      />
      <ComboboxContent>
        <ComboboxEmpty>${EMPTY_TEXT}</ComboboxEmpty>
        <ComboboxList>
          {(value: string) => (
            <ComboboxItem key={value} value={value}>
              {(${labelsLiteral} as Record<string, string>)[value] ?? value}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
    `),
    dependencies: {
      "@/components/ui/combobox": [
        "Combobox",
        "ComboboxContent",
        "ComboboxEmpty",
        "ComboboxInput",
        "ComboboxItem",
        "ComboboxList",
      ],
    },
  };
}

export const ComboboxDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  html: <HtmlGroup />,
  label: <LabelGroup whitelist={["label", "labelPosition", "labelAlign", "showLabel"]} />,
  input: <InputGroup whitelist={["placeholder", "description", "value"]} />,
  options: <OptionsGroup />,
  button: null,
  validation: <ValidationGroup />,
};
