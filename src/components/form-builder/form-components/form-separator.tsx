import { Separator } from "@/components/ui/separator";
import { DesignPropertiesViews, ReactCode } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
import { GridGroup } from "../sidebar/groups/grid-group";
import { HtmlGroup } from "../sidebar/groups/html-group";
import { SettingsGroup } from "../sidebar/groups/settings-group";
import { cn, escapeHtml } from "@/lib/utils";
import { getComponentId, getGridClasses, getSetting, compactTemplate } from "./shared";

const WRAPPER_CLASSES = {
  horizontal: "flex w-full items-center py-2",
  vertical: "flex justify-center self-stretch",
};

export function FormSeparator(component: FormComponentModel) {
  const orientation = getSetting(component, "orientation", "horizontal");
  return (
    <div key={component.id} className={cn(WRAPPER_CLASSES[orientation], "h-full")}>
      <Separator
        id={getComponentId(component)}
        orientation={orientation}
        className={component.getField("attributes.class")}
      />
    </div>
  );
}

export function getReactCode(component: FormComponentModel): ReactCode {
  const orientation = getSetting(component, "orientation", "horizontal");
  const className = component.getField("attributes.class");
  return {
    template: compactTemplate(`
    <div className="${cn(getGridClasses(component), WRAPPER_CLASSES[orientation])}">
      <Separator
        id="${escapeHtml(getComponentId(component))}"
        orientation="${orientation}"
        ${className ? `className="${escapeHtml(className)}"` : ""}
      />
    </div>
    `),
    dependencies: {
      "@/components/ui/separator": ["Separator"],
    },
  };
}

export const SeparatorDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  html: <HtmlGroup whitelist={["id", "class"]} />,
  settings: (
    <SettingsGroup
      fields={[
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
  options: null,
  button: null,
  validation: null,
};
