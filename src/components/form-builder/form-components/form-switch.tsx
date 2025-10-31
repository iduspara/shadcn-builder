import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DesignPropertiesViews, ReactCode } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
import { HtmlGroup } from "../sidebar/groups/html-group";
import { GridGroup } from "../sidebar/groups/grid-group";
import { LabelGroup } from "../sidebar/groups/label-group";
import { InputGroup } from "../sidebar/groups/input-group";
import { cn, generateTWClassesForAllViewports, escapeHtml } from "@/lib/utils";
import { ControllerRenderProps } from "react-hook-form";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { ValidationGroup } from "../sidebar/groups/validation-group";
import { FieldLabel } from "@/components/ui/field";

export function FormSwitch(component: FormComponentModel, form: UseFormReturn<FieldValues, undefined>, field: ControllerRenderProps) {
  const asCardClasses = generateTWClassesForAllViewports(component, "asCard");
  const componentId = component.getField("attributes.id") || component.id;
  const isCard = component.getField("properties.style.asCard") === "yes";
  const WrapperComponent = isCard ? FieldLabel : "div" as React.ElementType;

  return (
    <WrapperComponent
      key={component.id}
      className={cn(asCardClasses, "flex justify-between items-center w-full has-[[data-state=checked]]:border-primary")}
      htmlFor={componentId}
    >
      <div className="grid gap-1 leading-none">
        <FieldLabel>
          {component.getField("label")}
        </FieldLabel>
        <p className="text-sm text-muted-foreground">
          {component.getField("label_description")}
        </p>
      </div>
      <Switch id={componentId} {...field} checked={field.value} onCheckedChange={field.onChange} />
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
      className="${escapeHtml(cn(asCardClasses, "w-full flex justify-between items-center has-[[data-state=checked]]:border-primary"))}"
      htmlFor="${escapeHtml(componentId)}"
    >
      <div className="grid gap-1.5 leading-none">
        <FieldLabel>
          ${escapeHtml(component.getField("label"))}
        </FieldLabel>
        <p className="text-sm text-muted-foreground">
          ${escapeHtml(component.getField("label_description"))}
        </p>
      </div>
      <Switch id="${escapeHtml(componentId)}" {...field} checked={field.value} onCheckedChange={field.onChange} />
    </${WrapperComponent}>
    `,
    dependencies: {
      "@/components/ui/switch": ["Switch"]
    },
  };
}

export const SwitchDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  html: <HtmlGroup />,
  label: <LabelGroup whitelist={["label", "label_description"]} />,
  input: <InputGroup whitelist={["description", "asCard", "checked"]} />,
  options: null,
  button: null,
  validation: <ValidationGroup />,
};
