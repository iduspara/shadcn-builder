// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { DndContext } from "@dnd-kit/core";
import { useForm } from "react-hook-form";
import { RowColumn } from "@/components/form-builder/canvas/sortable-row";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import type { FormComponentModel } from "@/models/FormComponent";
import { componentVariants } from "./component-variants";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

function render(node: React.ReactElement) {
  const container = document.createElement("div");
  const root = createRoot(container);
  act(() => root.render(node));
  const html = container.innerHTML;
  act(() => root.unmount());
  return html.replace(/_r_[a-zA-Z0-9]+_|«[^»]+»|:r[0-9a-z]+:|DndDescribedBy-\d+/gi, "<id>");
}

function Harness({ component }: { component: FormComponentModel }) {
  const form = useForm();
  return (
    <DndContext>
      <RowColumn component={component} index={0} form={form} />
    </DndContext>
  );
}

const MODES = ["editor", "editor-preview", "preview"] as const;

describe("canvas row column", () => {
  const variants = componentVariants().filter((v) =>
    ["input/plain", "input/rich", "text/plain", "separator/rich", "checkbox-group/rich"].includes(v.name)
  );
  for (const { name, model } of variants) {
    it(name, () => {
      const other = componentVariants()[0].model;
      const out = MODES.flatMap((mode) =>
        [null, model, other].map((selected) => {
          useFormBuilderStore.setState({
            mode,
            viewport: "md",
            selectedComponent: selected,
            components: [model],
            enableDragging: true,
          });
          const label = selected === null ? "none" : selected === model ? "self" : "other";
          return `${mode}/selected=${label}: ${render(<Harness component={model} />)}`;
        })
      );
      expect(out.join("\n")).toMatchSnapshot();
    });
  }
});
