import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DesignPropertiesViews, ReactCode } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
import { GridGroup } from "../sidebar/groups/grid-group";
import { HtmlGroup } from "../sidebar/groups/html-group";
import { LabelGroup } from "../sidebar/groups/label-group";
import { InputGroup } from "../sidebar/groups/input-group";
import { OptionsGroup } from "../sidebar/groups/options-group";
import { cn, escapeHtml, generateTWClassesForAllViewports } from "@/lib/utils";
import {
  UseFormReturn,
  FieldValues,
  ControllerRenderProps,
} from "react-hook-form";
import { ValidationGroup } from "../sidebar/groups/validation-group";
import { Controller } from "react-hook-form";
import { FieldLabel } from "@/components/ui/field";

export function FormCheckboxGroup(
  component: FormComponentModel,
  form: UseFormReturn<FieldValues, undefined>,
  field: ControllerRenderProps
) {
  const oneOptionHasLabelDescription = component.options?.some((option) => option.labelDescription);
  const asCardClasses = generateTWClassesForAllViewports(component, "asCard");
  const cardLayoutClasses = component.getField("properties.style.cardLayout");
  const componentId = component.getField("attributes.id") || component.id;
  const isCard = component.getField("properties.style.asCard") === "yes";
  const WrapperComponent = isCard ? FieldLabel : "div" as React.ElementType;
  return (
    <div className={cn("grid w-full gap-2", cardLayoutClasses === "horizontal" && "@3xl:grid-cols-2")}>
      {component.options?.map((option) => (
        <Controller
          name={component.id}
          key={option.value}
          control={form.control}
          render={({ field: OptionField }) => {
            return (
              <WrapperComponent key={option.value} className={cn("flex items-start has-[[data-state=checked]]:border-primary w-full space-x-3", asCardClasses)}>
                <Checkbox
                  id={`${componentId}-${option.value}`}
                  checked={OptionField.value?.includes(option.value)}
                  onCheckedChange={(checked) => {
                    return checked
                      ? OptionField.onChange([
                          ...(OptionField.value || []),
                          option.value,
                        ])
                      : OptionField.onChange(
                          OptionField.value?.filter(
                            (value: string) => value !== option.value
                          )
                        );
                  }}
                />
                <div className="grid gap-1 leading-none">
                  <FieldLabel className={cn("text-sm leading-tight font-normal", oneOptionHasLabelDescription && "font-medium")} htmlFor={`${componentId}-${option.value}`}>
                    {option.label}
                  </FieldLabel>
                  {option.labelDescription && (
                    <p className="text-sm text-muted-foreground">
                      {option.labelDescription}
                    </p>
                  )}
                </div>
              </WrapperComponent>
            );
          }}
        />
      ))}
    </div>
  );
}

export function getReactCode(component: FormComponentModel): ReactCode {
  const oneOptionHasLabelDescription = component.options?.some((option) => option.labelDescription);
  const cardLayoutClasses = component.getField("properties.style.cardLayout");
  const asCardClasses = generateTWClassesForAllViewports(component, "asCard");
  const isCard = component.getField("properties.style.asCard") === "yes";
  const WrapperComponent = isCard ? 'FieldLabel' : "div";
  return {
    template: `
    <div className="${escapeHtml(cn("grid w-full gap-2", cardLayoutClasses === "horizontal" && "@3xl:grid-cols-2"))}">
      ${component.options
        ?.map(
          (option) => `
        <Controller
          name="${component.id}"
          control={form.control}
          render={({ field: OptionField }) => {
            return (
              <${WrapperComponent} key="${option.value}" className="${escapeHtml(cn("flex items-start has-[[data-state=checked]]:border-primary w-full space-x-3", asCardClasses))}">
                  <Checkbox
                    id="${component.getField("attributes.id")}-${escapeHtml(option.value)}"
                    checked={OptionField.value?.includes("${option.value}")}
                    onCheckedChange={(checked) => {
                      return checked
                        ? OptionField.onChange([
                            ...OptionField.value || [],
                            "${option.value}",
                          ])
                        : OptionField.onChange(
                            OptionField.value?.filter(
                              (value: string) => value !== "${option.value}"
                            )
                          );
                    }}
                  />
                <div className="grid gap-2 leading-none">
                  <FieldLabel className="${oneOptionHasLabelDescription ? "font-medium" : "font-normal"}" htmlFor="${component.getField("attributes.id")}-${escapeHtml(option.value)}">
                    ${option.label}
                  </FieldLabel>
                  ${option.labelDescription ? `<p className="text-sm text-muted-foreground">${escapeHtml(option.labelDescription)}</p>` : ""}
                </div>
              </${WrapperComponent}>
            );
          }}
        />
      `).join("\n")}
    </div>
    `,
    dependencies: {
      "@/components/ui/checkbox": ["Checkbox"],
    },
  };
}

export const CheckboxGroupDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  html: <HtmlGroup />,
  label: <LabelGroup whitelist={["label"]} />,
  input: <InputGroup whitelist={["description", "asCard", "cardLayout"]} />,
  options: <OptionsGroup />,
  button: null,
  validation: <ValidationGroup />,
};
