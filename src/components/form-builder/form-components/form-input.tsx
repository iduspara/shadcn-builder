import { Input } from "@/components/ui/input";
import { DesignPropertiesViews } from "@/types/form-builder.types";
import { FormComponentModel } from "../Models/FormComponent";
import { HtmlGroup } from "../sidebar/groups/html-group";
import { LabelGroup } from "../sidebar/groups/label-group";
import { InputGroup } from "../sidebar/groups/input-group";
import { GridGroup } from "../sidebar/groups/grid-group";
import { cn, escapeHtml } from "@/lib/utils";

export function FormInput(component: FormComponentModel) {
  return (
    <Input
      key={component.id}
      placeholder={component.getField("attributes.placeholder")}
      type={component.getField("attributes.type")}
      id={component.getField("attributes.id")}
      name={component.getField("attributes.name")}
      className={cn(component.getField("attributes.class"))}
    />
  );
}

type ReactCode = {
  code: string;
  dependencies: Record<string, string[]>;
};

export function getReactCode(component: FormComponentModel): ReactCode {
  return {
    code: `
    <Input
      key="${component.id}"
      placeholder="${escapeHtml(component.getField("attributes.placeholder"))}"
      type="${escapeHtml(component.getField("attributes.type"))}"
      id="${escapeHtml(component.getField("attributes.id"))}"
      name="${escapeHtml(component.getField("attributes.name"))}"
      className="${escapeHtml(component.getField("attributes.class"))}"
    />  
    `,
    dependencies: {
      "@/components/ui/input": ["Input"],
    },
  };
}

export const InputDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  html: <HtmlGroup />,
  label: <LabelGroup />,
  input: <InputGroup />,
  options: null,
  button: null,
};
