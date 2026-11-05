import { AVAILABLE_COMPONENTS } from "@/config/available-components";
import { FormComponentModel } from "@/models/FormComponent";
import type { FormComponentModelInput } from "@/types/FormComponent.types";

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

/** Overrides that exercise every viewport-aware style key. */
const VIEWPORT_OVERRIDES: FormComponentModelInput["overrides"] = {
  md: {
    properties: {
      style: { colSpan: "6", colStart: "2", labelPosition: "left", labelAlign: "center", showLabel: "no", visible: "no", asCard: "yes", textAlign: "center" },
    },
  } as never,
  lg: {
    label: "Desktop label",
    properties: {
      style: { colSpan: "4", labelPosition: "right", labelAlign: "end", visible: "yes", textAlign: "right" },
    },
  } as never,
};

const RICH_SETTINGS = {
  min: 5, max: 50, step: 5, range: "yes", length: 4, pattern: "alphanumeric", multiple: "yes",
  prefix: "$", suffix: "USD", prefixIcon: "Mail", suffixIcon: "Search", addonButton: "Go",
  title: "Heads up", size: "lg", orientation: "vertical",
} as const;

export interface ComponentVariant {
  name: string;
  model: FormComponentModel;
}

export function componentVariants(): ComponentVariant[] {
  return AVAILABLE_COMPONENTS.flatMap((base, index) => {
    const input = clone(base) as unknown as FormComponentModelInput;
    const id = `${base.type}-${index}`;
    const plain: FormComponentModelInput = {
      ...input,
      id,
      attributes: { ...input.attributes, id },
    };
    const rich: FormComponentModelInput = {
      ...plain,
      id: `${id}-rich`,
      attributes: { ...plain.attributes, id: `${id}-rich`, placeholder: "Type here", disabled: true },
      description: "Helper description",
      label_description: "Label description",
      value: base.type === "number" ? 7 : base.value,
      options: plain.options?.map((option, i) => ({
        ...option,
        checked: i === 0,
        labelDescription: `Option ${i} description`,
      })),
      properties: {
        ...plain.properties,
        style: {
          ...plain.properties?.style,
          asCard: "yes",
          cardLayout: "horizontal",
          labelPosition: "left",
          icon: "Star",
          iconPosition: "right",
        },
        variant: "outline",
        settings: { ...RICH_SETTINGS },
      },
      overrides: VIEWPORT_OVERRIDES,
      validations: { ...plain.validations, required: "yes" },
    };
    return [
      { name: `${base.type}/plain`, model: new FormComponentModel(plain) },
      { name: `${base.type}/rich`, model: new FormComponentModel(rich) },
    ];
  });
}
