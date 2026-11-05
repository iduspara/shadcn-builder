import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DesignPropertiesViews, ReactCode } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
import { GridGroup } from "../sidebar/groups/grid-group";
import { HtmlGroup } from "../sidebar/groups/html-group";
import { SettingsGroup } from "../sidebar/groups/settings-group";
import { cn, escapeHtml } from "@/lib/utils";
import { Icon } from "../helpers/icon-render";
import { getComponentId, getGridClasses, getSetting, compactTemplate } from "./shared";

function getAlertConfig(component: FormComponentModel) {
  return {
    variant:
      component.getField("properties.variant") === "destructive"
        ? ("destructive" as const)
        : ("default" as const),
    title: getSetting(component, "title", ""),
    description: component.getField("content") || "",
    icon: component.getField("properties.style.icon") || "",
  };
}

export function FormAlert(component: FormComponentModel) {
  const { variant, title, description, icon } = getAlertConfig(component);
  return (
    <Alert
      key={component.id}
      id={getComponentId(component)}
      variant={variant}
      className={component.getField("attributes.class")}
    >
      {icon && <Icon name={icon} strokeWidth={2} />}
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
}

export function getReactCode(component: FormComponentModel): ReactCode {
  const { variant, title, description, icon } = getAlertConfig(component);
  return {
    template: compactTemplate(`
    <Alert
      id="${escapeHtml(getComponentId(component))}"
      variant="${variant}"
      className="${escapeHtml(cn(getGridClasses(component), component.getField("attributes.class")))}"
    >
      ${icon ? `<${icon} />` : ""}
      ${title ? `<AlertTitle>${escapeHtml(title)}</AlertTitle>` : ""}
      ${description ? `<AlertDescription>${escapeHtml(description)}</AlertDescription>` : ""}
    </Alert>
    `),
    dependencies: {
      "@/components/ui/alert": [
        "Alert",
        ...(title ? ["AlertTitle"] : []),
        ...(description ? ["AlertDescription"] : []),
      ],
      ...(icon && { "lucide-react": [icon] }),
    },
  };
}

export const AlertDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  html: <HtmlGroup whitelist={["id", "class"]} />,
  settings: (
    <SettingsGroup
      fields={[
        {
          kind: "select",
          path: "properties.variant",
          label: "Variant",
          options: [
            { value: "default", label: "Default" },
            { value: "destructive", label: "Destructive" },
          ],
        },
        { kind: "text", path: "properties.settings.title", label: "Title" },
        { kind: "text", path: "content", label: "Description" },
        { kind: "icon", path: "properties.style.icon", label: "Icon" },
      ]}
    />
  ),
  label: null,
  input: null,
  options: null,
  button: null,
  validation: null,
};
