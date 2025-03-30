import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DesignPropertiesViews } from "@/types/form-builder.types";
import { FormComponentModel } from "../Models/FormComponent";
import { GridGroup } from "../sidebar/groups/grid-group";
import { HtmlGroup } from "../sidebar/groups/html-group";
import { LabelGroup } from "../sidebar/groups/label-group";
import { InputGroup } from "../sidebar/groups/input-group";
import { OptionsGroup } from "../sidebar/groups/options-group";
import { cn, escapeHtml } from "@/lib/utils";

export function FormCheckboxGroup(component: FormComponentModel) {
  return (
    <div
      key={component.id}
      className={cn("flex flex-col gap-2")}
    >
      {component.options?.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <Checkbox
            id={`${component.getField("attributes.id")}-${option.value}`}
            name={component.getField("attributes.name")}
            checked={option.checked}
          />
          <Label htmlFor={`${component.getField("attributes.id")}-${option.value}`}>
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  );
}

type ReactCode = {
  code: string;
  dependencies: Record<string, string[]>;
};

export function getReactCode(component: FormComponentModel): ReactCode {
  return {
    code: `
    <div
      key="${component.id}"
      className="${escapeHtml(cn("flex flex-col space-y-2"))}"
    >
      ${component.options?.map((option) => `
        <div key="${escapeHtml(option.value)}" className="flex items-center space-x-2">
          <Checkbox
            id="${escapeHtml(component.getField("attributes.id"))}-${escapeHtml(option.value)}"
            name="${escapeHtml(component.getField("attributes.name"))}"
            defaultChecked={${option.checked || false}}
          />
          <Label htmlFor="${escapeHtml(component.getField("attributes.id"))}-${escapeHtml(option.value)}">
            ${escapeHtml(option.label)}
          </Label>
        </div>
      `).join("\n")}
    </div>
    `,
    dependencies: {
      "@/components/ui/checkbox": ["Checkbox"],
      "@/components/ui/label": ["Label"],

    },
  };
}

export const CheckboxGroupDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  html: <HtmlGroup />,
  label: <LabelGroup whitelist={["label", "label_description"]} />,
  input: <InputGroup whitelist={["description", "asCard"]} />,
  options: <OptionsGroup />,
  button: null,
}; 
