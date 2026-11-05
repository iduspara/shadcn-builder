"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { FormComponentModel } from "@/models/FormComponent";
import { renderComponent } from "@/config/available-components";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Field } from "@/components/ui/field";
import { getSliderDefaultValue } from "@/components/form-builder/form-components/form-slider";
import { getToggleGroupDefaultValue } from "@/components/form-builder/form-components/form-toggle-group";

interface ComponentPreviewProps {
  component: FormComponentModel;
}

export function ComponentPreview({ component }: ComponentPreviewProps) {
  const form = useForm({
    defaultValues: getPreviewDefaultValues(component),
    mode: "onSubmit",
  });

  // Generate a unique field name for this component to prevent autofill
  const fieldName = `preview_${component.id}`;

  const renderedComponent = renderComponent(component, form, {
    name: fieldName,
    value: form.watch(fieldName),
    onChange: (value: any) => form.setValue(fieldName, value.target?.value || value),
    onBlur: () => {},
    ref: () => {},
    
  });

  const showLabel = component.getField("properties.style.showLabel") !== "no";
  const label = component.getField("label") || component.label;
  const labelDescription = component.getField("label_description") || component.label_description;

  return (
      <Field>
        {showLabel && label && (
          <div className="space-y-1">
            <Label className="text-sm font-medium" htmlFor={component.getField("attributes.id") || component.id}>
              {label}
              {component.getField("validations.required") === "yes" && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
            {labelDescription && (
              <p className="text-xs text-muted-foreground">{labelDescription}</p>
            )}
          </div>
        )}
        
        <Controller
          name={fieldName}
          control={form.control}
          render={() => (renderedComponent as React.ReactElement) || <div>Preview not available</div>}
        />
      </Field>
  );
}

type PreviewDefault = (component: FormComponentModel) => unknown;

const attributeValue: PreviewDefault = (component) => component.getField("attributes.value") || "";
const attributeChecked: PreviewDefault = (component) => component.getField("attributes.checked") || false;

const PREVIEW_DEFAULTS: Partial<Record<string, PreviewDefault>> = {
  input: attributeValue,
  email: attributeValue,
  password: attributeValue,
  tel: attributeValue,
  url: attributeValue,
  number: attributeValue,
  textarea: attributeValue,
  select: attributeValue,
  date: attributeValue,
  checkbox: attributeChecked,
  switch: attributeChecked,
  "checkbox-group": (component) =>
    component.options?.filter((option) => option.checked).map((option) => option.value) || [],
  radio: (component) =>
    component.getField("attributes.value") || component.options?.[0]?.value || "",
  slider: getSliderDefaultValue,
  "toggle-group": getToggleGroupDefaultValue,
  "credit-card": () => ({ number: "", expiry: "", cvc: "", name: "" }),
};

export function getPreviewDefaultValues(component: FormComponentModel): Record<string, any> {
  const resolve = PREVIEW_DEFAULTS[component.type];
  return { [`preview_${component.id}`]: resolve ? resolve(component) : "" };
}
