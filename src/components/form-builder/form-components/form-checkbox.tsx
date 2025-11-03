import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DesignPropertiesViews, ReactCode } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
import { GridGroup } from "../sidebar/groups/grid-group";
import { HtmlGroup } from "../sidebar/groups/html-group";
import { LabelGroup } from "../sidebar/groups/label-group";
import { InputGroup } from "../sidebar/groups/input-group";
import { cn, generateTWClassesForAllViewports, escapeHtml } from "@/lib/utils";
import {
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { ValidationGroup } from "../sidebar/groups/validation-group";
import { FieldLabel } from "@/components/ui/field";

export function FormCheckbox(
  component: FormComponentModel,
  form: UseFormReturn<FieldValues, undefined>,
  field: ControllerRenderProps
) {
  const asCardClasses = generateTWClassesForAllViewports(component, "asCard");
  const componentId = component.getField("attributes.id") || component.id;
  const isCard = component.getField("properties.style.asCard") === "yes";
  const WrapperComponent = isCard ? FieldLabel : "div" as React.ElementType;

  return (
    <WrapperComponent
      key={component.id}
      className={cn(
        "w-full flex items-start has-[[data-state=checked]]:border-primary space-x-3",
        asCardClasses,
      )}
      htmlFor={componentId}
    >
      <Checkbox
        id={componentId}
        className={cn(component.getField("attributes.class"))}
        name={field.name}
        checked={field.value}
        onCheckedChange={field.onChange}
      />
      <div className="grid gap-1.5 leading-none">
        <FieldLabel htmlFor={componentId}>{component.getField("label")}</FieldLabel>
        <p className="text-sm text-muted-foreground">
          {component.getField("label_description")}
        </p>
      </div>
    </WrapperComponent>
  );
}


export function getReactCode(component: FormComponentModel): ReactCode {
  const asCardClasses = generateTWClassesForAllViewports(component, "asCard");
  const componentId = component.getField("attributes.id") || component.id;
  const isCard = component.getField("properties.style.asCard") === "yes";
  const WrapperComponent = isCard ? 'FieldLabel' : "div";
  return {
    template: `
    <${WrapperComponent}
      key="${component.id}"
      className="${escapeHtml(cn(asCardClasses, "w-full flex items-start has-[[data-state=checked]]:border-primary"))}"
      ${isCard ? `htmlFor="${escapeHtml(componentId)}"` : ""}
    >
      <Checkbox id="${escapeHtml(componentId)}" name={field.name} className="${escapeHtml(component.getField("attributes.class"))}" checked={field.value} onCheckedChange={field.onChange} />
      <div className="grid gap-1.5 leading-none">
        <FieldLabel>
          ${escapeHtml(component.getField("label"))}
        </FieldLabel>
        <p className="text-sm text-muted-foreground">
          ${escapeHtml(component.getField("label_description"))}
        </p>
      </div>
    </${WrapperComponent}>
    `,
    dependencies: {
      "@/components/ui/checkbox": ["Checkbox"],
    },
  };
}

export const CheckboxDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  html: <HtmlGroup />,
  label: <LabelGroup whitelist={["label", "label_description"]} />,
  input: <InputGroup whitelist={["description", "asCard", "checked"]} />,
  options: null,
  button: null,
  validation: <ValidationGroup />,
};
