import { describe, expect, it } from "vitest";
import { handleCanvasDragEnd } from "@/components/form-builder/canvas/handle-canvas-drag-end";
import { getGridRows } from "@/lib/utils";
import { FormComponentModel } from "@/models/FormComponent";
import type { Viewports } from "@/types/FormComponent.types";

const make = (id: string, colSpan: string) =>
  new FormComponentModel({
    id,
    type: "input",
    category: "form",
    label: id,
    label_info: "",
    icon: "Type",
    attributes: { id },
    properties: { style: { colSpan: colSpan as never } },
  });

// Rows (sm): [a b] [c] [d e f] [g]
const COMPONENTS = [
  make("a", "6"), make("b", "6"), make("c", "12"),
  make("d", "4"), make("e", "4"), make("f", "4"), make("g", "12"),
];
const POSITIONS = ["left", "right", "top", "bottom"] as const;
const NEW_COMPONENT = make("new", "12");

function run(event: unknown, viewport: Viewports = "sm") {
  const calls: string[] = [];
  handleCanvasDragEnd(event, {
    components: COMPONENTS,
    gridRows: getGridRows(COMPONENTS, viewport),
    addComponent: (component) => {
      calls.push(`add ${component.id}`);
      return make("added", "12");
    },
    updateComponent: (...args) => calls.push(`update ${JSON.stringify(args)}`),
    moveComponent: (from, to) => calls.push(`move ${from} -> ${to}`),
  });
  return calls.join("; ") || "(no-op)";
}

const drop = (component: FormComponentModel | undefined, index: number, position?: string) => ({
  data: { current: { component, index, position } },
});

describe("handleCanvasDragEnd", () => {
  it("ignores drops outside a target", () => {
    expect(run({ active: { data: { current: { action: "move", component: COMPONENTS[0], index: 0 } } }, over: null })).toBe("(no-op)");
  });

  it("moves every component to every position", () => {
    const lines: string[] = [];
    COMPONENTS.forEach((active, activeIndex) =>
      COMPONENTS.forEach((over, overIndex) =>
        POSITIONS.forEach((position) => {
          const event = {
            active: { data: { current: { action: "move", component: active, index: activeIndex } } },
            over: drop(over, overIndex, position),
          };
          lines.push(`${active.id}@${activeIndex} -> ${over.id}@${overIndex} ${position}: ${run(event)}`);
        })
      )
    );
    expect(lines.join("\n")).toMatchSnapshot();
  });

  it("adds a new component at every position", () => {
    const lines = COMPONENTS.flatMap((over, overIndex) =>
      POSITIONS.map((position) => {
        const event = {
          active: { data: { current: { action: "add", component: NEW_COMPONENT } } },
          over: drop(over, overIndex, position),
        };
        return `new -> ${over.id}@${overIndex} ${position}: ${run(event)}`;
      })
    );
    lines.push(
      `new -> empty-state: ${run({
        active: { data: { current: { action: "add", component: NEW_COMPONENT } } },
        over: { data: { current: { index: 0 } } },
      })}`
    );
    expect(lines.join("\n")).toMatchSnapshot();
  });
});
