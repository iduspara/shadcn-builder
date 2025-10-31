"use client";

import { useFormBuilderStore } from "@/stores/form-builder-store";

import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";
import { Controller, FieldValues, UseFormReturn } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { cn, generateTWClassesForAllViewports } from "@/lib/utils";
import { renderComponent } from "@/config/available-components";
import { FormComponentModel } from "@/models/FormComponent";
import { FormWysiwygEditor } from "../form-components/wysiwyg/form-wysiwyg-editor";
import { useState } from "react";

export interface FormComponentProps {
  form: UseFormReturn<FieldValues, undefined>;
  component: FormComponentModel;
}

export function RenderEditorComponent({ form, component }: FormComponentProps) {
  const {
    selectedComponent,
    viewport,
    updateComponent,
    updateEnableDragging,
    selectComponent,
  } = useFormBuilderStore();
  const mode = useFormBuilderStore((state) => state.mode);

  const labelPositionClasses = generateTWClassesForAllViewports(
    component,
    "labelPosition"
  );

  const labelAlignClasses = generateTWClassesForAllViewports(
    component,
    "labelAlign"
  );

  const showLabel = component.getField("properties.style.showLabel", viewport) === "yes";
  const visible = component.getField("properties.style.visible", viewport) === "yes";

  return component.category === "form" ? (
    <Controller
      key={component.id}
      control={form.control}
      name={component.id}
      render={({ field, fieldState }) => {
        const renderedComponent = renderComponent(component, form, field);
        return (
          <Field
            className={cn(
              mode === "editor" && "group/component",
              "flex flex-col",
              labelPositionClasses,
              labelAlignClasses
            )}
            data-item-id={component.id}
            data-invalid={fieldState.invalid}
          >
            <FieldLabel
              className={cn(
                "w-auto! flex items-center gap-2 ",
                mode === "editor" && "cursor-pointer",
                !showLabel && visible && "hidden"
              )}
              htmlFor={component.getField("attributes.id") || component.id}
            >
              {showLabel && component.getField("label", viewport)}
              {!visible && (
                <span className="text-xs text-muted-foreground">Hidden</span>
              )}
            </FieldLabel>
            {renderedComponent}
            {component.description && (
              <FieldDescription>{component.description}</FieldDescription>
            )}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  ) : (
    <div
      className={cn(
        "relative flex flex-col h-full",
        selectedComponent?.id === component.id &&
          mode === "editor" &&
          "cursor-text bg-white"
      )}
      key={component.id}
      data-item-id={component.id}
    >
      <FormWysiwygEditor
        value={component.content || ""}
        isEditable={selectedComponent?.id === component.id && mode === "editor"}
        onChange={(content) => {
          updateComponent(component.id, "content", content, true);
          selectComponent(null);
        }}
        onFocus={() => {
          updateEnableDragging(false);
        }}
        onBlur={(editor) => {
          updateEnableDragging(true);
        }}
      />
    </div>
  );
}
