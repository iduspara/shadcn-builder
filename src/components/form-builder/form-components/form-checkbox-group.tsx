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
import {
  FormField,
  FormLabel,
  FormItem,
  FormControl,
} from "@/components/ui/form";
import { useFormBuilderStore } from "@/stores/form-builder-store";

export function FormCheckboxGroup(
  component: FormComponentModel,
  form: UseFormReturn<FieldValues, undefined>,
  field: ControllerRenderProps
) {
  const oneOptionHasLabelDescription = component.options?.some((option) => option.labelDescription);
  const asCardClasses = generateTWClassesForAllViewports(component, "asCard");
  const cardLayoutClasses = component.getField("properties.style.cardLayout");

  return (
    <div className={cn("grid w-full gap-2", cardLayoutClasses === "horizontal" && "@3xl:grid-cols-2")}>
      {component.options?.map((option) => (
        <FormField
          name={component.id}
          key={option.value}
          control={form.control}
          render={({ field: OptionField }) => {
            return (
              <FormLabel key={option.value} className={cn(asCardClasses, "flex items-start has-[[data-state=checked]]:border-primary")} htmlFor={`${component.getField("attributes.id") || component.id}-${option.value}`}>
                <FormControl>
                  <Checkbox
                    id={`${component.getField("attributes.id") || component.id}-${option.value}`}
                    checked={OptionField.value?.includes(option.value)}
                    onCheckedChange={(checked) => {
                      return checked
                        ? OptionField.onChange([
                            ...OptionField.value || [],
                            option.value,
                          ])
                        : OptionField.onChange(
                            OptionField.value?.filter(
                              (value: string) => value !== option.value
                            )
                          );
                    }}
                  />
                </FormControl>
                <div className="grid gap-1 leading-none">
                  <FormLabel htmlFor={`${component.getField("attributes.id") || component.id}-${option.value}`} className={cn("text-sm leading-tight font-normal", oneOptionHasLabelDescription && "font-medium")}>
                    {option.label}
                  </FormLabel>
                  {option.labelDescription && (
                    <p className="text-sm text-muted-foreground">
                      {option.labelDescription}
                    </p>
                  )}
                </div>
              </FormLabel>
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

  return {
    template: `
    <div className="${escapeHtml(cn("grid w-full gap-2", cardLayoutClasses === "horizontal" && "@3xl:grid-cols-2"))}">
      ${component.options
        ?.map(
          (option) => `
        <FormField
          name="${component.id}"
          control={form.control}
          render={({ field: OptionField }) => {
            return (
              <FormItem key="${option.value}" className="${escapeHtml(cn(asCardClasses, "flex items-start"))}">
                <FormControl>
                  <Checkbox
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
                </FormControl>
                <div className="grid gap-2 leading-none">
                  <FormLabel className="${oneOptionHasLabelDescription ? "font-medium" : "font-normal"}">
                    ${option.label}
                  </FormLabel>
                  ${option.labelDescription ? `<p className="text-sm text-muted-foreground">${escapeHtml(option.labelDescription)}</p>` : ""}
                </div>
              </FormItem>
            );
          }}
        />
      `).join("\n")}
    </div>
    `,
    dependencies: {
      "@/components/ui/checkbox": ["Checkbox"],
      "@/components/ui/form": ["FormLabel"],
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
