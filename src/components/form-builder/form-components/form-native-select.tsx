import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { FormComponentModel } from "@/models/FormComponent"
import { cn, escapeHtml } from "@/lib/utils"
import {
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from "react-hook-form"
import { ReactCode } from "@/types/form-builder.types"
import { SelectDesignProperties as BaseSelectDesignProperties } from "./form-select"

export function FormNativeSelect(
  component: FormComponentModel,
  form: UseFormReturn<FieldValues, undefined>,
  field: ControllerRenderProps
) {
  const componentId = component.getField("attributes.id") || component.id
  const placeholder = component.getField("attributes.placeholder")
  const isRequired =
    component.getField("validations.required") === "yes" ||
    component.getField("attributes.required") === true
  const fieldState = form.getFieldState(field.name, form.formState)

  return (
    <NativeSelect
      key={component.id}
      id={componentId}
      name={component.getField("attributes.name") || field.name}
      className={cn("w-full", component.getField("attributes.class"))}
      value={field.value ?? ""}
      onChange={(event) => field.onChange(event.target.value)}
      onBlur={field.onBlur}
      ref={field.ref}
      disabled={component.getField("attributes.disabled")}
      aria-invalid={fieldState.invalid ? "true" : undefined}
    >
      {placeholder && (
        <NativeSelectOption
          value=""
          disabled={isRequired}
          hidden={isRequired}
        >
          {placeholder}
        </NativeSelectOption>
      )}
      {component.options?.map((option) => (
        <NativeSelectOption key={option.value} value={option.value}>
          {option.label}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  )
}

export function getReactCode(component: FormComponentModel): ReactCode {
  const componentId = component.getField("attributes.id") || component.id
  const placeholder = component.getField("attributes.placeholder")
  const isRequired =
    component.getField("validations.required") === "yes" ||
    component.getField("attributes.required") === true

  const placeholderTemplate = placeholder
    ? `
        <NativeSelectOption value=""${isRequired ? " disabled hidden" : ""}>
          ${escapeHtml(placeholder)}
        </NativeSelectOption>`
    : ""

  const optionsTemplate = component.options
    ?.map(
      (option) => `
        <NativeSelectOption value="${escapeHtml(option.value)}">
          ${escapeHtml(option.label)}
        </NativeSelectOption>`
    )
    .join("")

  return {
    template: `
      <NativeSelect
        key="${component.id}"
        id="${escapeHtml(componentId)}"
        name="${escapeHtml(
          component.getField("attributes.name") || componentId
        )}"
        className="${escapeHtml(
          cn("w-full", component.getField("attributes.class"))
        )}"
        value={field.value ?? ""}
        onChange={(event) => field.onChange(event.target.value)}
        onBlur={field.onBlur}
        ref={field.ref}
      >${placeholderTemplate}${optionsTemplate || "\n"}
      </NativeSelect>
    `,
    dependencies: {
      "@/components/ui/native-select": [
        "NativeSelect",
        "NativeSelectOption",
      ],
    },
  }
}

export const NativeSelectDesignProperties = BaseSelectDesignProperties

