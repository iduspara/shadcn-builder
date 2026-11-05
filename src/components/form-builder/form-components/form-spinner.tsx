import { Spinner } from "@/components/ui/spinner";
import { DesignPropertiesViews, ReactCode } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
import { GridGroup } from "../sidebar/groups/grid-group";
import { HtmlGroup } from "../sidebar/groups/html-group";
import { SettingsGroup } from "../sidebar/groups/settings-group";
import { cn, escapeHtml } from "@/lib/utils";
import { getComponentId, getGridClasses, getSetting, compactTemplate } from "./shared";

const SIZE_CLASSES = { sm: "size-3", default: "size-4", lg: "size-6" };
const WRAPPER_CLASSES = "flex items-center gap-2 text-sm text-muted-foreground";

function getSpinnerClasses(component: FormComponentModel) {
  return cn(
    SIZE_CLASSES[getSetting(component, "size", "default")],
    component.getField("attributes.class")
  );
}

export function FormSpinner(component: FormComponentModel) {
  return (
    <div key={component.id} className={WRAPPER_CLASSES}>
      <Spinner id={getComponentId(component)} className={getSpinnerClasses(component)} />
      {component.getField("content")}
    </div>
  );
}

export function getReactCode(component: FormComponentModel): ReactCode {
  return {
    template: compactTemplate(`
    <div className="${cn(getGridClasses(component), WRAPPER_CLASSES)}">
      <Spinner
        id="${escapeHtml(getComponentId(component))}"
        className="${escapeHtml(getSpinnerClasses(component))}"
      />
      ${escapeHtml(component.getField("content"))}
    </div>
    `),
    dependencies: {
      "@/components/ui/spinner": ["Spinner"],
    },
  };
}

export const SpinnerDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  html: <HtmlGroup whitelist={["id", "class"]} />,
  settings: (
    <SettingsGroup
      fields={[
        {
          kind: "select",
          path: "properties.settings.size",
          label: "Size",
          options: [
            { value: "sm", label: "Small" },
            { value: "default", label: "Default" },
            { value: "lg", label: "Large" },
          ],
        },
        { kind: "text", path: "content", label: "Text", placeholder: "Loading..." },
      ]}
    />
  ),
  label: null,
  input: null,
  options: null,
  button: null,
  validation: null,
};
