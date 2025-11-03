import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { DesignPropertiesViews, ReactCode } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
import { GridGroup } from "../sidebar/groups/grid-group";
import { HtmlGroup } from "../sidebar/groups/html-group";
import { LabelGroup } from "../sidebar/groups/label-group";
import { InputGroup } from "../sidebar/groups/input-group";
import { cn, escapeHtml } from "@/lib/utils";
import { OptionsGroup } from "../sidebar/groups/options-group";
import { ControllerRenderProps } from "react-hook-form";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { ValidationGroup } from "../sidebar/groups/validation-group";

export function FormSelect(component: FormComponentModel, form: UseFormReturn<FieldValues, undefined>, field: ControllerRenderProps) {
  const componentId = component.getField("attributes.id") || component.id;
  return (
    <Select key={component.id} value={field.value} name={field.name} onValueChange={field.onChange}>
      <SelectTrigger
        id={componentId}
        className={cn(component.getField("attributes.class"), "w-full")}
      >
        <SelectValue placeholder={component.getField("attributes.placeholder")} />
      </SelectTrigger>
      <SelectContent>
        {component.options?.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}


export function getReactCode(component: FormComponentModel): ReactCode {
  const componentId = component.getField("attributes.id") || component.id;
  return {
    template: `
    <Select
      key="${component.id}"
      value={field.value}
      name={field.name}
      onValueChange={field.onChange}
      >
      <SelectTrigger className="w-full ${escapeHtml(component.getField("attributes.class"))}">
        <SelectValue placeholder="${escapeHtml(component.getField("attributes.placeholder"))}" />
      </SelectTrigger>
      <SelectContent>
        ${component.options?.map((option) => `
          <SelectItem key="${escapeHtml(option.value)}" value="${escapeHtml(option.value)}">
            ${escapeHtml(option.label)}
          </SelectItem>
        `).join("\n")}
      </SelectContent>
    </Select>
    `,
    dependencies: {
      "@/components/ui/select": ["Select", "SelectTrigger", "SelectContent", "SelectItem", "SelectValue"],

    },  
  };
}


export const SelectDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  html: <HtmlGroup />,
  label: <LabelGroup whitelist={["label", "labelPosition", "labelAlign", "showLabel"]} />,
  input: <InputGroup whitelist={["placeholder", "description", "value"]} />,
  options: <OptionsGroup />,
  button: null,
  validation: <ValidationGroup />,
};
