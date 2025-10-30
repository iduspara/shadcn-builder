import { Input } from "@/components/ui/input";
import { DesignPropertiesViews, ReactCode } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
import { HtmlGroup } from "../sidebar/groups/html-group";
import { LabelGroup } from "../sidebar/groups/label-group";
import { InputGroup as SidebarInputGroup } from "../sidebar/groups/input-group";
import { GridGroup } from "../sidebar/groups/grid-group";
import { cn, escapeHtml } from "@/lib/utils";
import { ValidationGroup } from "../sidebar/groups/validation-group";
import { ControllerRenderProps } from "react-hook-form";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { Icon } from "../helpers/icon-render";
import {
  InputGroupAddon,
  InputGroupInput,
  InputGroup,
} from "@/components/ui/input-group";

export function FormInput(
  component: FormComponentModel,
  form: UseFormReturn<FieldValues, undefined>,
  field: ControllerRenderProps
) {
  const IconName = component.getField("properties.style.icon");
  const IconStrokeWidth = component.getField(
    "properties.style.iconStrokeWidth"
  );
  const IconPosition = component.getField("properties.style.iconPosition");

  return IconName ? (
    <InputGroup>
      <InputGroupInput
        key={component.id}
        placeholder={component.getField("attributes.placeholder")}
        type={component.getField("attributes.type")}
        className={cn(component.getField("attributes.class"))}
        {...field}
      />
      {IconName && (
        <InputGroupAddon
          align={IconPosition === "left" ? "inline-start" : "inline-end"}
        >
          <Icon
            name={IconName}
            className="size-4"
            strokeWidth={IconStrokeWidth}
          />
        </InputGroupAddon>
      )}
    </InputGroup>
  ) : (
    <Input
      key={component.id}
      placeholder={component.getField("attributes.placeholder")}
      type={component.getField("attributes.type")}
      className={cn(component.getField("attributes.class"))}
      {...field}
    />
  );
}

export function getReactCode(component: FormComponentModel): ReactCode {
  const IconName = component.getField("properties.style.icon");
  const IconStrokeWidth = component.getField(
    "properties.style.iconStrokeWidth"
  );
  const IconPosition = component.getField("properties.style.iconPosition");
  return {
    template: IconName ? `
      <InputGroup>
        <InputGroupInput
          key="${component.id}"
          placeholder="${escapeHtml(component.getField("attributes.placeholder"))}"
          type="${escapeHtml(component.getField("attributes.type"))}"
          className="${escapeHtml(cn(
            component.getField("attributes.class")
          ))}"
          {...field}
        />
        <InputGroupAddon align="${IconPosition === "left" ? "inline-start" : "inline-end"}">
          <${IconName}Icon
            className="size-4"
            strokeWidth={${IconStrokeWidth}}
          />
        </InputGroupAddon>
      </InputGroup>`
      : `
      <Input
        key="${component.id}"
        placeholder="${escapeHtml(component.getField("attributes.placeholder"))}"
        type="${escapeHtml(component.getField("attributes.type"))}"
        className="${escapeHtml(cn(component.getField("attributes.class")))}"
        {...field}
      />
      `,
    dependencies: {
      "@/components/ui/input": ["Input"],
      ...(IconName && {
        [`lucide-react`]: [`${IconName}Icon`],
      }),
    },
  };
}

export const InputDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  html: <HtmlGroup />,
  label: (
    <LabelGroup
      whitelist={["label", "labelPosition", "labelAlign", "showLabel"]}
    />
  ),
  input: <SidebarInputGroup />,
  options: null,
  button: null,
  validation: <ValidationGroup />,
};
