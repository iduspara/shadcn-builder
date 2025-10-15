import { Textarea } from "@/components/ui/textarea";
import { DesignPropertiesViews, ReactCode } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
import { InputGroup } from "../sidebar/groups/input-group";
import { HtmlGroup } from "../sidebar/groups/html-group";
import { GridGroup } from "../sidebar/groups/grid-group";
import { LabelGroup } from "../sidebar/groups/label-group";
import { cn, generateTWClassesForAllViewports, escapeHtml } from "@/lib/utils";
import { ControllerRenderProps } from "react-hook-form";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { ValidationGroup } from "../sidebar/groups/validation-group";

export function FormTextarea(component: FormComponentModel, form: UseFormReturn<FieldValues, undefined>, field: ControllerRenderProps) {
  const colSpanClasses = generateTWClassesForAllViewports(component, "colSpan");
  
  return (
    <Textarea
    key={component.id}
      id={component.getField("attributes.id")}
      placeholder={component.getField("attributes.placeholder")}
      className={component.getField("attributes.class")}
      {...field}
    />
  );
}


export function getReactCode(component: FormComponentModel): ReactCode {
  return {
    template: `
    <Textarea
      key="${component.id}"
      id="${escapeHtml(component.getField("attributes.id"))}"
      placeholder="${escapeHtml(component.getField("attributes.placeholder"))}"
      className="${escapeHtml(component.getField("attributes.class"))}"
      {...field}
    />
    `,
    dependencies: {
      "@/components/ui/textarea": ["Textarea"], 

    },
  };
}

export const TextareaDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  html: <HtmlGroup />,
  label: <LabelGroup whitelist={["label", "labelPosition", "labelAlign", "showLabel"]} />,
  input: <InputGroup whitelist={["placeholder", "description", "value"]} />,
  options: null,
  button: null,
  validation: <ValidationGroup />,
};
