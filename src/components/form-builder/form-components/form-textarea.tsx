import { Textarea } from "@/components/ui/textarea";
import { DesignPropertiesViews } from "@/types/form-builder.types";
import { FormComponentModel } from "../Models/FormComponent";
import { InputGroup } from "../sidebar/groups/input-group";
import { HtmlGroup } from "../sidebar/groups/html-group";
import { GridGroup } from "../sidebar/groups/grid-group";
import { LabelGroup } from "../sidebar/groups/label-group";
import { cn, generateTWClassesForAllViewports, escapeHtml } from "@/lib/utils";

export function FormTextarea(component: FormComponentModel) {
  const colSpanClasses = generateTWClassesForAllViewports(component, "colSpan");
  
  return (
    <div key={component.id} className={cn(colSpanClasses)}>
      <Textarea
        id={component.getField("attributes.id")}
        name={component.getField("attributes.name")}
        placeholder={component.getField("attributes.placeholder")}
        className={component.getField("attributes.class")}
      />
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
    <Textarea
      key="${component.id}"
      id="${escapeHtml(component.getField("attributes.id"))}"
      name="${escapeHtml(component.getField("attributes.name"))}"
      placeholder="${escapeHtml(component.getField("attributes.placeholder"))}"
      className="${escapeHtml(component.getField("attributes.class"))}"
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
  label: <LabelGroup />,
  input: <InputGroup />,
  options: null,
  button: null,
};
