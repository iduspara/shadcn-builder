import { cn, generateTWClassesForAllViewports } from "@/lib/utils";
import { FormComponentModel } from "@/models/FormComponent";
import { FormComponentSettings } from "@/types/FormComponent.types";

export function getComponentId(component: FormComponentModel): string {
  return component.getField("attributes.id") || component.id;
}

/** Reads `properties.settings.<key>`, falling back when unset or empty. */
export function getSetting<K extends keyof FormComponentSettings>(
  component: FormComponentModel,
  key: K,
  fallback: NonNullable<FormComponentSettings[K]>
): NonNullable<FormComponentSettings[K]> {
  const value = component.getField(`properties.settings.${key}`);
  return value === undefined || value === null || value === ""
    ? fallback
    : value;
}

/**
 * Grid placement for content components in exported code. Form components get
 * this from the generated <Field> wrapper; content components are emitted
 * directly into the grid, so they carry their own classes.
 */
export function getGridClasses(component: FormComponentModel): string {
  return cn(
    generateTWClassesForAllViewports(component, "colSpan"),
    generateTWClassesForAllViewports(component, "colStart"),
    generateTWClassesForAllViewports(component, "visible")
  );
}

/** Embeds a value as a JS literal inside a generated JSX expression. */
export function toJsLiteral(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

/**
 * Drops whitespace-only lines left behind by optional attributes/children in
 * a JSX template; JSX ignores them, but Prettier would keep them as gaps.
 */
export function compactTemplate(template: string): string {
  return template
    .split("\n")
    .filter((line) => line.trim() !== "")
    .join("\n");
}

/** Layout settings shared by option groups (radio, checkbox group). */
export function getOptionGroupLayout(component: FormComponentModel) {
  return {
    oneOptionHasLabelDescription: !!component.options?.some(
      (option) => option.labelDescription
    ),
    asCardClasses: generateTWClassesForAllViewports(component, "asCard"),
    cardLayoutClasses: component.getField("properties.style.cardLayout"),
    componentId: getComponentId(component),
    isCard: component.getField("properties.style.asCard") === "yes",
  };
}
