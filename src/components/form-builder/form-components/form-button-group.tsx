import { Button } from "@/components/ui/button";
import { ButtonGroup as UIButtonGroup } from "@/components/ui/button-group";
import { DesignPropertiesViews, ReactCode } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
import { GridGroup } from "../sidebar/groups/grid-group";
import { HtmlGroup } from "../sidebar/groups/html-group";
import { OptionsGroup } from "../sidebar/groups/options-group";
import { SettingsGroup } from "../sidebar/groups/settings-group";
import { cn, escapeHtml } from "@/lib/utils";
import { getComponentId, getGridClasses, getSetting, compactTemplate } from "./shared";

/** An option whose value is "submit" or "reset" gets that button type. */
function getButtonType(value: string): "button" | "submit" | "reset" {
  return value === "submit" || value === "reset" ? value : "button";
}

function getButtonGroupConfig(component: FormComponentModel) {
  return {
    orientation: getSetting(component, "orientation", "horizontal"),
    variant: component.getField("properties.variant") || "outline",
    buttons: (component.options ?? []).map((option) => ({
      label: option.label,
      type: getButtonType(option.value),
    })),
  };
}

export function FormButtonGroup(component: FormComponentModel) {
  const { orientation, variant, buttons } = getButtonGroupConfig(component);
  return (
    <div key={component.id} className="flex">
      <UIButtonGroup
        id={getComponentId(component)}
        orientation={orientation}
        className={component.getField("attributes.class")}
      >
        {buttons.map((button, index) => (
          <Button key={index} type={button.type} variant={variant}>
            {button.label}
          </Button>
        ))}
      </UIButtonGroup>
    </div>
  );
}

export function getReactCode(component: FormComponentModel): ReactCode {
  const { orientation, variant, buttons } = getButtonGroupConfig(component);
  const className = component.getField("attributes.class");
  const buttonsCode = buttons
    .map(
      (button) =>
        `<Button type="${button.type}" variant="${variant}">${escapeHtml(button.label)}</Button>`
    )
    .join("\n");

  return {
    template: compactTemplate(`
    <div className="${cn(getGridClasses(component), "flex")}">
      <ButtonGroup
        id="${escapeHtml(getComponentId(component))}"
        orientation="${orientation}"
        ${className ? `className="${escapeHtml(className)}"` : ""}
      >
        ${buttonsCode}
      </ButtonGroup>
    </div>
    `),
    dependencies: {
      "@/components/ui/button": ["Button"],
      "@/components/ui/button-group": ["ButtonGroup"],
    },
  };
}

export const ButtonGroupDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  html: <HtmlGroup whitelist={["id", "class"]} />,
  options: (
    <>
      <OptionsGroup />
      <p className="text-xs text-muted-foreground">
        Each option is a button. Use the value &quot;submit&quot; or
        &quot;reset&quot; to set its type.
      </p>
    </>
  ),
  settings: (
    <SettingsGroup
      fields={[
        {
          kind: "select",
          path: "properties.variant",
          label: "Variant",
          options: [
            { value: "outline", label: "Outline" },
            { value: "default", label: "Default" },
            { value: "secondary", label: "Secondary" },
            { value: "ghost", label: "Ghost" },
          ],
        },
        {
          kind: "toggle",
          path: "properties.settings.orientation",
          label: "Orientation",
          options: [
            { value: "horizontal", label: "horizontal" },
            { value: "vertical", label: "vertical" },
          ],
        },
      ]}
    />
  ),
  label: null,
  input: null,
  button: null,
  validation: null,
};
