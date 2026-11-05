import {
  Viewports,
  FormComponentProperties,
  FormComponentAttributes,
  FormComponentModelInput,
  FormComponentValidationTypes,
  FormComponentTypes,
} from "@/types/FormComponent.types";
import { icons } from "lucide-react";

const DEFAULT_PROPERTIES: FormComponentProperties = {
  style: {
    asCard: "no",
    cardLayout: "vertical",
    showLabel: "yes",
    visible: "yes",
    labelPosition: "top",
    labelAlign: "start",
    textAlign: "left",
    colSpan: "12",
    colStart: "auto",
    icon: "",
    iconPosition: "left",
    iconStrokeWidth: 2,
  },
  variant: "default",
};

export class FormComponentModel {
  id: string;
  label: string;
  label_info: string;
  label_description?: string;
  type: FormComponentTypes;
  value?: string | number;
  content?: string;
  description?: string;
  options?: FormComponentModelInput["options"];
  category: "form" | "content";
  icon: keyof typeof icons;
  properties?: FormComponentProperties;
  attributes?: FormComponentAttributes;
  overrides?: Partial<Record<Viewports, any>>;
  validations?: FormComponentValidationTypes;

  constructor(input: FormComponentModelInput) {
    this.id = input.id;
    this.label = input.label;
    this.label_info = input.label_info;
    this.label_description = input.label_description;
    this.type = input.type;
    this.value = input.value;
    this.category = input.category;
    this.icon = input.icon;
    this.properties = {
      ...DEFAULT_PROPERTIES,
      style: {
        ...DEFAULT_PROPERTIES.style,
        ...(input.properties?.style || {})
      },
      variant: input.properties?.variant || DEFAULT_PROPERTIES.variant,
      ...(input.properties?.settings && {
        settings: { ...input.properties.settings },
      }),
    };
    this.content = input.content;
    this.description = input.description;
    this.options = input.options;
    this.attributes = input.attributes;
    this.overrides = input.overrides;
    this.validations = input.validations;
  }

  // Called explicitly when saving forms (use-save-form.ts)
  // fallow-ignore-next-line unused-class-member
  toJSON(): FormComponentModelInput {
    return {
      ...this
    };
  }

  getField(field: string, viewport?: Viewports, escapeHtml?: boolean): any {
    const getNestedValue = (obj: any, path: string[]): any => {
      if (path.length === 0) return obj;
      const [current, ...rest] = path;
      return obj && typeof obj === "object"
        ? getNestedValue(obj[current], rest)
        : undefined;
    };

    const fieldPath = field.split(".");

    if (this.overrides && viewport) {
      // Check Tablet override first
      if (viewport === "md" && this.overrides["md"]) {
        const overrideValueTablet = getNestedValue(
          this.overrides["md"],
          fieldPath
        );
        if (overrideValueTablet !== undefined) return overrideValueTablet;
      }

      // Check Desktop override first
      if (viewport === "lg" && this.overrides?.[viewport]) {
        const overrideValueDesktop = getNestedValue(
          this.overrides["lg"],
          fieldPath
        );
        if (overrideValueDesktop !== undefined) return overrideValueDesktop;
      } else if (
        viewport === "lg" &&
        !this.overrides["lg"] &&
        this.overrides["md"]
      ) {
        // If Desktop not exists use the Tablet as fallback
        const overrideValueDesktop = getNestedValue(
          this.overrides["md"],
          fieldPath
        );
        if (overrideValueDesktop !== undefined) return overrideValueDesktop;
      }
    }

    // Fall back to base component value
    return getNestedValue(this, fieldPath);
  }
}
