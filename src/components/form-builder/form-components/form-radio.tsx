import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DesignPropertiesViews, ReactCode } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
import { HtmlGroup } from "../sidebar/groups/html-group";
import { GridGroup } from "../sidebar/groups/grid-group";
import { LabelGroup } from "../sidebar/groups/label-group";
import { InputGroup } from "../sidebar/groups/input-group";
import { OptionsGroup } from "../sidebar/groups/options-group";
import { cn, escapeHtml, generateTWClassesForAllViewports } from "@/lib/utils";
import {
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { ValidationGroup } from "../sidebar/groups/validation-group";
import { FieldLabel } from "@/components/ui/field";

export function FormRadio(
  component: FormComponentModel,
  form: UseFormReturn<FieldValues, undefined>,
  field: ControllerRenderProps
) {
  const oneOptionHasLabelDescription = component.options?.some(
    (option) => option.labelDescription
  );
  const asCardClasses = generateTWClassesForAllViewports(component, "asCard");
  const cardLayoutClasses = component.getField("properties.style.cardLayout");
  const componentId = component.getField("attributes.id") || component.id;
  const isCard = component.getField("properties.style.asCard") === "yes";
  const WrapperComponent = isCard ? FieldLabel : "div" as React.ElementType;
  return (
    <RadioGroup
      key={component.id}
      id={componentId}
      className={cn("w-full", component.getField("attributes.class"), cardLayoutClasses === "horizontal" && "@3xl:grid-cols-2")}
      value={field.value}
      name={field.name}
      onValueChange={field.onChange}
    >
      {component.options?.map((option) => (
        <WrapperComponent
          key={option.value}
          className={cn("flex items-start has-[[data-state=checked]]:border-primary w-full space-x-3", asCardClasses)}
          htmlFor={`${componentId}-${option.value}`}
        >
          <RadioGroupItem
            value={option.value}
            id={`${componentId}-${option.value}`}
          />
          <div className="grid gap-1 leading-none">
            <FieldLabel
              htmlFor={`${componentId}-${option.value}`}
              className={cn(
                "font-normal",
                oneOptionHasLabelDescription && "font-medium"
              )}
            >
              {option.label}
            </FieldLabel>
            {option.labelDescription && (
              <p className="text-sm text-muted-foreground">
                {option.labelDescription}
              </p>
            )}
          </div>
        </WrapperComponent>
      ))}
    </RadioGroup>
  );
}


export function getReactCode(component: FormComponentModel): ReactCode {
  const oneOptionHasLabelDescription = component.options?.some(
    (option) => option.labelDescription
  );
  const asCardClasses = generateTWClassesForAllViewports(component, "asCard");
  const cardLayoutClasses = component.getField("properties.style.cardLayout");
  const componentId = component.getField("attributes.id") || component.id;
  const isCard = component.getField("properties.style.asCard") === "yes";
  const WrapperComponent = isCard ? 'FieldLabel' : "div";
  return {
    template: `
    <RadioGroup
      key="${component.id}"
      id="${escapeHtml(componentId)}"
      className="${escapeHtml(cn("w-full", component.getField("attributes.class"), cardLayoutClasses === "horizontal" && "@3xl:grid-cols-2"))}"
      value={field.value}
      name={field.name}
      onValueChange={field.onChange}
    > 
      ${component.options
        ?.map(
          (option) => `
        <${WrapperComponent} key="${escapeHtml(option.value)}" className="${escapeHtml(cn("flex items-center has-[[data-state=checked]]:border-primary w-full space-x-3", asCardClasses))}" ${WrapperComponent === 'FieldLabel' ? `htmlFor="${escapeHtml(component.getField("attributes.id"))}-${escapeHtml(option.value)}"` : ""}>
          <RadioGroupItem value="${escapeHtml(option.value)}" id="${escapeHtml(component.getField("attributes.id"))}-${escapeHtml(option.value)}" />
          <div className="grid gap-2 leading-none">
            <FieldLabel htmlFor="${escapeHtml(component.getField("attributes.id"))}-${escapeHtml(option.value)}" className="${oneOptionHasLabelDescription ? "font-medium" : "font-normal"}">
              ${escapeHtml(option.label)}
            </FieldLabel>  
            ${option.labelDescription ? `<p className="text-sm text-muted-foreground">${escapeHtml(option.labelDescription)}</p>` : ""}
          </div>
        </${WrapperComponent}>
      `
        )
        .join("\n")}
    </RadioGroup>
    `,
    dependencies: {
      "@/components/ui/radio-group": ["RadioGroup", "RadioGroupItem"],
    },
  };
}

export const RadioDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  html: <HtmlGroup />,
  label: (
    <LabelGroup
      whitelist={["label", "labelPosition", "labelAlign", "showLabel"]}
    />
  ),
  input: <InputGroup whitelist={["placeholder", "description", "value", "asCard", "cardLayout"]} />,
  options: <OptionsGroup />,
  button: null,
  validation: <ValidationGroup />,
};
