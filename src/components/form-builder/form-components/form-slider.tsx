import { Slider } from "@/components/ui/slider";
import { DesignPropertiesViews, ReactCode } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
import { GridGroup } from "../sidebar/groups/grid-group";
import { HtmlGroup } from "../sidebar/groups/html-group";
import { LabelGroup } from "../sidebar/groups/label-group";
import { InputGroup } from "../sidebar/groups/input-group";
import { SettingsGroup } from "../sidebar/groups/settings-group";
import { cn, escapeHtml } from "@/lib/utils";
import { ControllerRenderProps, FieldValues, UseFormReturn } from "react-hook-form";
import { getComponentId, getSetting, compactTemplate } from "./shared";

export function getSliderConfig(component: FormComponentModel) {
  const min = Number(getSetting(component, "min", 0));
  const max = Number(getSetting(component, "max", 100));
  const step = Number(getSetting(component, "step", 1));
  const isRange = getSetting(component, "range", "no") === "yes";
  return { min, max, step, isRange };
}

/** Default form value: a number, or a [from, to] tuple in range mode. */
export function getSliderDefaultValue(
  component: FormComponentModel
): number | [number, number] {
  const { min, max, isRange } = getSliderConfig(component);
  if (isRange) return [min, max];
  const value = Number(component.getField("value"));
  return Number.isFinite(value) && component.getField("value") !== ""
    ? Math.min(Math.max(value, min), max)
    : min;
}

/** The ui Slider renders one thumb per array entry, so always pass an array. */
function toSliderValue(
  value: unknown,
  component: FormComponentModel
): number[] {
  const { isRange } = getSliderConfig(component);
  if (isRange && Array.isArray(value) && value.length === 2) return value;
  if (!isRange && typeof value === "number") return [value];
  const fallback = getSliderDefaultValue(component);
  return Array.isArray(fallback) ? fallback : [fallback];
}

export function FormSlider(
  component: FormComponentModel,
  form: UseFormReturn<FieldValues, undefined>,
  field: ControllerRenderProps
) {
  const { min, max, step, isRange } = getSliderConfig(component);
  const value = toSliderValue(field.value, component);

  return (
    <div key={component.id} className="flex w-full items-center gap-4">
      <Slider
        id={getComponentId(component)}
        name={field.name}
        className={cn("flex-1", component.getField("attributes.class"))}
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={(next) => {
          const values = Array.isArray(next) ? next : [next];
          field.onChange(isRange ? values : values[0]);
        }}
      />
      <span className="min-w-12 text-right text-sm tabular-nums text-muted-foreground">
        {isRange ? `${value[0]}–${value[1]}` : value[0]}
      </span>
    </div>
  );
}

export function getReactCode(component: FormComponentModel): ReactCode {
  const { min, max, step, isRange } = getSliderConfig(component);
  const valueExpr = isRange ? "field.value" : "[field.value]";
  const onChangeExpr = isRange
    ? "field.onChange(value)"
    : "field.onChange(Array.isArray(value) ? value[0] : value)";
  const displayExpr = isRange
    ? "{field.value[0]}–{field.value[1]}"
    : "{field.value}";

  return {
    template: compactTemplate(`
    <div className="flex w-full items-center gap-4">
      <Slider
        id="${escapeHtml(getComponentId(component))}"
        name={field.name}
        className="${escapeHtml(cn("flex-1", component.getField("attributes.class")))}"
        min={${min}}
        max={${max}}
        step={${step}}
        value={${valueExpr}}
        onValueChange={(value) => ${onChangeExpr}}
      />
      <span className="min-w-12 text-right text-sm tabular-nums text-muted-foreground">
        ${displayExpr}
      </span>
    </div>
    `),
    dependencies: {
      "@/components/ui/slider": ["Slider"],
    },
  };
}

export const SliderDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  html: <HtmlGroup />,
  label: <LabelGroup whitelist={["label", "labelPosition", "labelAlign", "showLabel"]} />,
  input: <InputGroup whitelist={["description"]} />,
  settings: (
    <SettingsGroup
      fields={[
        { kind: "number", path: "properties.settings.min", label: "Min" },
        { kind: "number", path: "properties.settings.max", label: "Max" },
        { kind: "number", path: "properties.settings.step", label: "Step", min: 0 },
        {
          kind: "toggle",
          path: "properties.settings.range",
          label: "Range",
          options: [
            { value: "yes", label: "yes" },
            { value: "no", label: "no" },
          ],
        },
        { kind: "number", path: "value", label: "Default value" },
      ]}
    />
  ),
  options: null,
  button: null,
  validation: null,
};
