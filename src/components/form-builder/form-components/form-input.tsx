import { Input } from "@/components/ui/input";
import { DesignPropertiesViews, ReactCode } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
import { HtmlGroup } from "../sidebar/groups/html-group";
import { LabelGroup } from "../sidebar/groups/label-group";
import { InputGroup } from "../sidebar/groups/input-group";
import { GridGroup } from "../sidebar/groups/grid-group";
import { cn, escapeHtml } from "@/lib/utils";
import { ValidationGroup } from "../sidebar/groups/validation-group";
import { ControllerRenderProps } from "react-hook-form";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { Icon } from "../helpers/icon-render";
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

  return (
    <div className="relative w-full">
      <Input
        key={component.id}
        placeholder={component.getField("attributes.placeholder")}
        type={component.getField("attributes.type")}
        className={cn(
          component.getField("attributes.class"),
          IconName ? (IconPosition === "left" ? "ps-9" : "pe-9") : ""
        )}
        {...field}
      />
      {IconName && (
        <div
          className={cn(
            "text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50",
            IconPosition === "left" ? "start-0 ps-3" : "end-0 pe-3"
          )}
        >
          <Icon
            name={IconName}
            className="size-4"
            strokeWidth={IconStrokeWidth}
          />
        </div>
      )}
    </div>
  );
}

export function getReactCode(component: FormComponentModel): ReactCode {
  const IconName = component.getField("properties.style.icon");
  const IconStrokeWidth = component.getField(
    "properties.style.iconStrokeWidth"
  );
  const IconPosition = component.getField("properties.style.iconPosition");
  return {
    template: `
    <div className="relative w-full">
    <Input
      key="${component.id}"
      placeholder="${escapeHtml(component.getField("attributes.placeholder"))}"
      type="${escapeHtml(component.getField("attributes.type"))}"
      id="${escapeHtml(component.getField("attributes.id"))}"
      className="${escapeHtml(component.getField("attributes.class"))} ${IconName ? (IconPosition === "left" ? "ps-9" : "pe-9") : ""}"
      {...field}
    />  
    ${
      IconName
        ? `<div className={"text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 ${IconPosition === "left" ? "start-0 ps-3" : "end-0 pe-3"}"}>
          <${IconName}
            className="size-4"
            strokeWidth={${IconStrokeWidth}}
          />
    </div>`
        : ""
    }
    </div>
    `,
    dependencies: {
      "@/components/ui/input": ["Input"],
      ...(IconName && {
        [`lucide-react`]: [IconName],
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
  input: <InputGroup />,
  options: null,
  button: null,
  validation: <ValidationGroup />,
};
