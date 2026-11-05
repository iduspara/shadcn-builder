import { Badge } from "@/components/ui/badge";
import { DesignPropertiesViews, ReactCode } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
import { GridGroup } from "../sidebar/groups/grid-group";
import { HtmlGroup } from "../sidebar/groups/html-group";
import { SettingsGroup } from "../sidebar/groups/settings-group";
import { cn, escapeHtml } from "@/lib/utils";
import { getComponentId, getGridClasses, compactTemplate } from "./shared";

const BADGE_VARIANTS = ["default", "secondary", "destructive", "outline"] as const;
type BadgeVariant = (typeof BADGE_VARIANTS)[number];

function getBadgeVariant(component: FormComponentModel): BadgeVariant {
  const variant = component.getField("properties.variant");
  return BADGE_VARIANTS.includes(variant) ? variant : "default";
}

export function FormBadge(component: FormComponentModel) {
  return (
    <div key={component.id} className="flex">
      <Badge
        id={getComponentId(component)}
        variant={getBadgeVariant(component)}
        className={component.getField("attributes.class")}
      >
        {component.getField("content")}
      </Badge>
    </div>
  );
}

export function getReactCode(component: FormComponentModel): ReactCode {
  const className = component.getField("attributes.class");
  return {
    template: compactTemplate(`
    <div className="${cn(getGridClasses(component), "flex")}">
      <Badge
        id="${escapeHtml(getComponentId(component))}"
        variant="${getBadgeVariant(component)}"
        ${className ? `className="${escapeHtml(className)}"` : ""}
      >
        ${escapeHtml(component.getField("content"))}
      </Badge>
    </div>
    `),
    dependencies: {
      "@/components/ui/badge": ["Badge"],
    },
  };
}

export const BadgeDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  html: <HtmlGroup whitelist={["id", "class"]} />,
  settings: (
    <SettingsGroup
      fields={[
        { kind: "text", path: "content", label: "Text" },
        {
          kind: "select",
          path: "properties.variant",
          label: "Variant",
          options: [
            { value: "default", label: "Default" },
            { value: "secondary", label: "Secondary" },
            { value: "destructive", label: "Destructive" },
            { value: "outline", label: "Outline" },
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
