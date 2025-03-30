import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DesignPropertiesViews } from "@/types/form-builder.types";
import { FormComponentModel } from "../Models/FormComponent";
import { HtmlGroup } from "../sidebar/groups/html-group";
import { GridGroup } from "../sidebar/groups/grid-group";
import { LabelGroup } from "../sidebar/groups/label-group";
import { InputGroup } from "../sidebar/groups/input-group";
import { OptionsGroup } from "../sidebar/groups/options-group";
import { cn, escapeHtml } from "@/lib/utils";

export function FormRadio(component: FormComponentModel) {
  return (
    <RadioGroup
      key={component.id}
      id={component.getField("attributes.id")}
      name={component.getField("attributes.name")}
      className={cn(component.getField("attributes.class"))}
    >
      {component.options?.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <RadioGroupItem
            value={option.value}
            id={`${component.getField("attributes.id")}-${option.value}`}
          />
          <Label htmlFor={`${component.getField("attributes.id")}-${option.value}`} className="font-normal">
            {option.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

type ReactCode = {
  code: string;
  dependencies: Record<string, string[]>;
};

export function getReactCode(component: FormComponentModel): ReactCode {
  return {
    code: `
    <RadioGroup
      key="${component.id}"
      id="${escapeHtml(component.getField("attributes.id"))}"
      name="${escapeHtml(component.getField("attributes.name"))}"
      className="${escapeHtml(component.getField("attributes.class"))}"
    > 
      ${component.options?.map((option) => `
        <div key="${escapeHtml(option.value)}" className="flex items-center space-x-2">
          <RadioGroupItem value="${escapeHtml(option.value)}" id="${escapeHtml(component.getField("attributes.id"))}-${escapeHtml(option.value)}" />
          <Label htmlFor="${escapeHtml(component.getField("attributes.id"))}-${escapeHtml(option.value)}">
            ${escapeHtml(option.label)}
          </Label>  
        </div>
      `).join("\n")}
    </RadioGroup>
    `,
    dependencies: {
      "@/components/ui/radio-group": ["RadioGroup", "RadioGroupItem"],  
      "@/components/ui/label": ["Label"],

    },
  };
}

export const RadioDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  html: <HtmlGroup />,
  label: <LabelGroup />,
  input: <InputGroup whitelist={["placeholder", "description"]} />,
  options: <OptionsGroup />,
  button: null,
};
