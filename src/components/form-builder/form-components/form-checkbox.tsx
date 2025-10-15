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
import { FormLabel } from "@/components/ui/form";
import { useFormBuilderStore } from "@/stores/form-builder-store";

export function FormCheckbox(
  component: FormComponentModel,
  form: UseFormReturn<FieldValues, undefined>,
  field: ControllerRenderProps
) {
  const asCardClasses = generateTWClassesForAllViewports(component, "asCard");

  return (
    <FormLabel
      key={component.id}
      className={cn(
        asCardClasses,
        "w-full flex items-start has-[[data-state=checked]]:border-primary",
      )}
      htmlFor={component.getField("attributes.id")}
    >
      <Checkbox
        id={component.getField("attributes.id")}
        className={cn(component.getField("attributes.class"))}
        {...field}
        checked={field.value}
        onCheckedChange={field.onChange}
      />
      <div className="grid gap-1.5 leading-none">
        <FormLabel htmlFor={component.getField("attributes.id")}>{component.getField("label")}</FormLabel>
        <p className="text-sm text-muted-foreground">
          {component.getField("label_description")}
        </p>
      </div>
    </FormLabel>
  );
}


export function getReactCode(component: FormComponentModel): ReactCode {
  const asCardClasses = generateTWClassesForAllViewports(component, "asCard");
  return {
    template: `
    <FormLabel
      key="${component.id}"
      className="${escapeHtml(cn(asCardClasses, "w-full flex items-start has-[[data-state=checked]]:border-primary"))}"
      htmlFor="${escapeHtml(component.getField("attributes.id"))}"
    >
      <Checkbox id="${escapeHtml(component.getField("attributes.id"))}" className="${escapeHtml(component.getField("attributes.class"))}" {...field} checked={field.value} onCheckedChange={field.onChange} />
      <div className="grid gap-1.5 leading-none">
        <FormLabel>
          ${escapeHtml(component.getField("label"))}
        </FormLabel>
        <p className="text-sm text-muted-foreground">
          ${escapeHtml(component.getField("label_description"))}
        </p>
      </div>
    </FormLabel>
    `,
    dependencies: {
      "@/components/ui/checkbox": ["Checkbox"],
      "@/components/ui/form": ["FormLabel"],
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
