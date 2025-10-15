import { Button } from "@/components/ui/button";
import { DesignPropertiesViews, ReactCode } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
import { GridGroup } from "../sidebar/groups/grid-group";
import { HtmlGroup } from "../sidebar/groups/html-group";
import { ButtonGroup } from "../sidebar/groups/button-group";
import { cn, escapeHtml } from "@/lib/utils";
import { UseFormReturn, FieldValues, ControllerRenderProps } from "react-hook-form";
import { Icon } from "../helpers/icon-render";
import { icons, Rows } from "lucide-react";

export function FormButton(component: FormComponentModel, form: UseFormReturn<FieldValues, undefined>, field: ControllerRenderProps) {
  const IconName = component.getField("properties.style.icon");
  const IconStrokeWidth = component.getField(
    "properties.style.iconStrokeWidth"
  );
  const IconPosition = component.getField("properties.style.iconPosition");
  let IconEl = <Icon name={IconName} className="size-4" strokeWidth={IconStrokeWidth} />

  return (
    <Button
      key={component.id}
      id={component.getField("attributes.id")}
      name={component.getField("attributes.name")}
      className={cn("w-full", component.getField("attributes.class"))}
      type={component.getField("attributes.type")}
      variant={component.getField("properties.variant")}
    >

      {IconName && IconPosition === "left" ? IconEl : null}
      {component.getField("content")}
      {IconName && IconPosition === "right" ? IconEl : null}
    </Button>
  );
}



export function getReactCode(component: FormComponentModel): ReactCode {
  const IconName = component.getField("properties.style.icon");
  const IconStrokeWidth = component.getField(
    "properties.style.iconStrokeWidth"
  );
  const IconPosition = component.getField("properties.style.iconPosition");
  let IconEl = `<${IconName} className="size-4" strokeWidth="${IconStrokeWidth}" />`;

  return {
    template: `
    <Button
      key="${component.id}"
      id="${escapeHtml(component.getField("attributes.id"))}"
      name="${escapeHtml(component.getField("attributes.name"))}"
      className="${escapeHtml(cn("w-full", component.getField("attributes.class")))}"
      type="${component.getField("attributes.type")}"
      variant="${component.getField("properties.variant")}"
    >
      ${IconName && IconPosition === "left" ? IconEl : ""}
      ${escapeHtml(component.getField("content"))}
      ${IconName && IconPosition === "right" ? IconEl : ""}
    </Button>
  `,
    dependencies: {
      "@/components/ui/button": ["Button"],
      ...(IconName && {
        [`lucide-react`]: [IconName],
      }),
    },
  };
}

export const ButtonDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  html: <HtmlGroup />,
  label: null,
  input: null,
  button: <ButtonGroup />,
  options: null,
  validation: null,
};
