// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { useForm } from "react-hook-form";
import { RenderEditorComponent } from "@/components/form-builder/helpers/render-editor-component";
import { ComponentPreview, getPreviewDefaultValues } from "@/components/form-builder/ui/component-preview";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import type { FormComponentModel } from "@/models/FormComponent";
import type { Viewports } from "@/types/FormComponent.types";
import { componentVariants } from "./component-variants";

function EditorHarness({ component }: { component: FormComponentModel }) {
  const form = useForm();
  return <RenderEditorComponent form={form} component={component} />;
}

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

function render(node: React.ReactElement) {
  const container = document.createElement("div");
  const root = createRoot(container);
  act(() => root.render(node));
  const html = container.innerHTML;
  act(() => root.unmount());
  return html.replace(/_r_[a-zA-Z0-9]+_|«[^»]+»|:r[0-9a-z]+:/gi, "<id>");
}

describe("editor canvas rendering", () => {
  const states: { mode: "editor" | "preview"; viewport: Viewports }[] = [
    { mode: "editor", viewport: "sm" },
    { mode: "preview", viewport: "lg" },
  ];
  for (const { name, model } of componentVariants()) {
    it(name, () => {
      const out = states.map(({ mode, viewport }) => {
        useFormBuilderStore.setState({ mode, viewport, selectedComponent: null });
        return `${mode}/${viewport}: ${render(<EditorHarness component={model} />)}`;
      });
      expect(out.join("\n")).toMatchSnapshot();
    });
  }
});

describe("component preview", () => {
  for (const { name, model } of componentVariants()) {
    it(name, () => {
      expect(render(<ComponentPreview component={model} />)).toMatchSnapshot();
    });
  }
});

describe("component preview default values", () => {
  it("matches for every component variant", () => {
    const values = componentVariants().map(({ name, model }) => [name, getPreviewDefaultValues(model)]);
    expect(values).toMatchSnapshot();
  });
});
