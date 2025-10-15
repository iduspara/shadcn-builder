"use client";

import React from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { FormComponentModel } from "@/models/FormComponent";
import { renderComponent } from "@/config/available-components";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface ComponentPreviewProps {
  component: FormComponentModel;
}

export function ComponentPreview({ component }: ComponentPreviewProps) {
  const form = useForm({
    defaultValues: getDefaultValues(component),
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
    <FormProvider {...form}>
      <div className="space-y-2">
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
      </div>
    </FormProvider>
  );
}

function getDefaultValues(component: FormComponentModel): Record<string, any> {
  const fieldName = `preview_${component.id}`;
  
  switch (component.type) {
    case "input":
      return {
        [fieldName]: component.getField("attributes.value") || "",
      };
    
    case "email":
      return {
        [fieldName]: component.getField("attributes.value") || "",
      };
    
    case "password":
      return {
        [fieldName]: component.getField("attributes.value") || "",
      };
    
    case "tel":
      return {
        [fieldName]: component.getField("attributes.value") || "",
      };
    
    case "url":
      return {
        [fieldName]: component.getField("attributes.value") || "",
      };
    
    case "number":
      return {
        [fieldName]: component.getField("attributes.value") || "",
      };
    
    case "textarea":
      return {
        [fieldName]: component.getField("attributes.value") || "",
      };
    
    case "select":
      return {
        [fieldName]: component.getField("attributes.value") || "",
      };
    
    case "checkbox":
      return {
        [fieldName]: component.getField("attributes.checked") || false,
      };
    
    case "checkbox-group":
      return {
        [fieldName]: component.options
          ?.filter(option => option.checked)
          .map(option => option.value) || [],
      };
    
    case "radio":
      return {
        [fieldName]: component.getField("attributes.value") || 
          (component.options?.[0]?.value) || "",
      };
    
    case "switch":
      return {
        [fieldName]: component.getField("attributes.checked") || false,
      };
    
    case "date":
      return {
        [fieldName]: component.getField("attributes.value") || "",
      };
    
    case "credit-card":
      return {
        [fieldName]: {
          number: "",
          expiry: "",
          cvc: "",
          name: "",
        },
      };
    
    case "button":
    case "submit-button":
    case "reset-button":
    case "text":
      return {
        [fieldName]: "",
      };
    
    default:
      return {
        [fieldName]: "",
      };
  }
}
