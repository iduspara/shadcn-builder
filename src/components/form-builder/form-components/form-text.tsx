import {
  cn,
  generateTWClassesForAllViewports,
  replaceBrTags,
  replaceClassWithClassName,
  replaceStyleStringWithObject,
} from "@/lib/utils";
import { DesignPropertiesViews, ReactCode } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
import { HtmlGroup } from "../sidebar/groups/html-group";
import { GridGroup } from "../sidebar/groups/grid-group";
import { UseFormReturn, FieldValues, ControllerRenderProps } from "react-hook-form";

export function Text(component: FormComponentModel, form: UseFormReturn<FieldValues, undefined>, field: ControllerRenderProps) {
  const colSpanClasses = generateTWClassesForAllViewports(component, "colSpan");
  const colStartClasses = generateTWClassesForAllViewports(
    component,
    "colStart"
  );

  return (
    <div
      key={component.id}
      className={cn(
        colSpanClasses,
        colStartClasses      )}
      dangerouslySetInnerHTML={{ __html: component.content || "" }}
    />
  );
}


export function getReactCode(component: FormComponentModel): ReactCode {
  const componentId = component.getField("attributes.id") || component.id;
  let content = replaceStyleStringWithObject(component.content || "");
  content = replaceBrTags(content);
  content = replaceClassWithClassName(content);
  const colSpanClasses = generateTWClassesForAllViewports(component, "colSpan");
  const colStartClasses = generateTWClassesForAllViewports(
    component,
    "colStart"
  );
  const customClasses = component.getField("attributes.class") || "";

  return {
    template: `
    <div
      key="${component.id}"
      id="${componentId}"
      className="${customClasses} ${colSpanClasses} ${colStartClasses}">
      ${content}
    </div>
    `,
    dependencies: {

    },
  };
}

export const TextDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  html: <HtmlGroup whitelist={["id", "class"]} />,
  label: null,
  input: null,
  options: null,
  button: null,
  validation: null,
};
