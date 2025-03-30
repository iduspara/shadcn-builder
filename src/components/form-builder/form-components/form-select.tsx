import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { DesignPropertiesViews } from "@/types/form-builder.types";
import { FormComponentModel } from "../Models/FormComponent";
import { GridGroup } from "../sidebar/groups/grid-group";
import { HtmlGroup } from "../sidebar/groups/html-group";
import { LabelGroup } from "../sidebar/groups/label-group";
import { InputGroup } from "../sidebar/groups/input-group";
import { cn, escapeHtml } from "@/lib/utils";
import { OptionsGroup } from "../sidebar/groups/options-group";

export function FormSelect(component: FormComponentModel) {
  return (
    <Select key={component.id}>
      <SelectTrigger
        id={component.getField("attributes.id")}
        name={component.getField("attributes.name")}
        className={cn(component.getField("attributes.class"))}
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

type ReactCode = {
  code: string;
  dependencies: Record<string, string[]>;
};

export function getReactCode(component: FormComponentModel): ReactCode {
  return {
    code: `
    <Select
      key="${component.id}"
      id="${escapeHtml(component.getField("attributes.id"))}"
      name="${escapeHtml(component.getField("attributes.name"))}"
      className="${escapeHtml(component.getField("attributes.class"))}"
    >
      <SelectTrigger>
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
  label: <LabelGroup />,
  input: <InputGroup whitelist={["placeholder", "description"]} />,
  options: <OptionsGroup />,
  button: null,
};
