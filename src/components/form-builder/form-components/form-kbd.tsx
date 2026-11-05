import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { DesignPropertiesViews, ReactCode } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
import { GridGroup } from "../sidebar/groups/grid-group";
import { HtmlGroup } from "../sidebar/groups/html-group";
import { SettingsGroup } from "../sidebar/groups/settings-group";
import { cn, escapeHtml } from "@/lib/utils";
import { Fragment } from "react";
import { getComponentId, getGridClasses, compactTemplate } from "./shared";

/** "Ctrl+Shift+K" -> ["Ctrl", "Shift", "K"] */
function getKeys(component: FormComponentModel): string[] {
  return String(component.getField("content") || "")
    .split("+")
    .map((key) => key.trim())
    .filter(Boolean);
}

export function FormKbd(component: FormComponentModel) {
  const keys = getKeys(component);
  return (
    <div key={component.id} className="flex">
      <KbdGroup id={getComponentId(component)} className={component.getField("attributes.class")}>
        {keys.map((key, index) => (
          <Fragment key={`${key}-${index}`}>
            {index > 0 && <span>+</span>}
            <Kbd>{key}</Kbd>
          </Fragment>
        ))}
      </KbdGroup>
    </div>
  );
}

export function getReactCode(component: FormComponentModel): ReactCode {
  const keys = getKeys(component)
    .map((key, index) => `${index > 0 ? "<span>+</span>" : ""}<Kbd>${escapeHtml(key)}</Kbd>`)
    .join("\n");
  const className = component.getField("attributes.class");
  return {
    template: compactTemplate(`
    <div className="${cn(getGridClasses(component), "flex")}">
      <KbdGroup
        id="${escapeHtml(getComponentId(component))}"
        ${className ? `className="${escapeHtml(className)}"` : ""}
      >
        ${keys}
      </KbdGroup>
    </div>
    `),
    dependencies: {
      "@/components/ui/kbd": ["Kbd", "KbdGroup"],
    },
  };
}

export const KbdDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  html: <HtmlGroup whitelist={["id", "class"]} />,
  settings: (
    <SettingsGroup
      fields={[
        { kind: "text", path: "content", label: "Keys", placeholder: "Ctrl+K" },
      ]}
    />
  ),
  label: null,
  input: null,
  options: null,
  button: null,
  validation: null,
};
