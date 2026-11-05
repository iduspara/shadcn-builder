import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { getComponentReactCode } from "@/config/available-components";
import { generateTWClassesForAllViewports } from "@/lib/utils";
import type { FormComponentStyles, Viewports } from "@/types/FormComponent.types";
import { FIXED_NOW } from "./fixtures";
import { componentVariants } from "./component-variants";

const STYLE_KEYS: (keyof FormComponentStyles)[] = [
  "asCard", "cardLayout", "showLabel", "visible", "labelPosition", "labelAlign",
  "textAlign", "colSpan", "colStart", "icon", "iconPosition",
];
const VIEWPORTS: (Viewports | undefined)[] = [undefined, "sm", "md", "lg"];

describe("per-component code generation", () => {
  for (const { name, model } of componentVariants()) {
    it(name, () => {
      expect(getComponentReactCode(model)).toMatchSnapshot();
    });

    it(`${name} tailwind classes and fields`, () => {
      const classes = Object.fromEntries(
        STYLE_KEYS.map((key) => [key, generateTWClassesForAllViewports(model, key)])
      );
      const fields = Object.fromEntries(
        VIEWPORTS.map((vp) => [
          vp ?? "none",
          ["label", "properties.style.colSpan", "properties.style.visible", "properties.style.labelPosition", "attributes.id", "missing.path"].map(
            (path) => model.getField(path, vp)
          ),
        ])
      );
      expect({ classes, fields }).toMatchSnapshot();
    });
  }
});

describe("full form with every component", () => {
  beforeAll(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(FIXED_NOW);
  });
  afterAll(() => vi.useRealTimers());

  it("generates the complete form", async () => {
    vi.resetModules();
    const { generateFormCode } = await import(
      "@/components/form-builder/helpers/generate-react-code"
    );
    const { code } = await generateFormCode(
      componentVariants().map((v) => v.model),
      "Every Component"
    );
    expect(code).toMatchSnapshot();
  });
});
