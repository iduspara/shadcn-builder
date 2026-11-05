import { FormComponentModel } from "@/models/FormComponent";
import { updateColSpans } from "@/lib/utils";

export interface CanvasDragEndContext {
  components: FormComponentModel[];
  gridRows: FormComponentModel[][];
  addComponent: (component: FormComponentModel) => FormComponentModel | undefined | void;
  updateComponent: (
    id: string,
    field: string,
    value: string,
    isValidForAllViewports?: boolean,
    isDragging?: boolean
  ) => void;
  moveComponent: (oldIndex: number, newIndex: number) => void;
}

type DropPosition = "left" | "right" | "top" | "bottom" | undefined;

interface DropInfo {
  activeIndex: number;
  overIndex: number;
  position: DropPosition;
}

const isSideDrop = (position: DropPosition) => position === "left" || position === "right";
const isVerticalDrop = (position: DropPosition) => position === "top" || position === "bottom";

/** Dropping next to itself (or on the adjacent edge of a neighbour) changes nothing. */
const isNoopDrop = ({ activeIndex, overIndex, position }: DropInfo) =>
  (activeIndex === overIndex && isSideDrop(position)) ||
  (activeIndex - overIndex === 1 && position === "bottom") ||
  (overIndex - activeIndex === 1 && position === "top");

const findRow = (gridRows: FormComponentModel[][], id: string | undefined) =>
  gridRows.find((row) => row.some((item) => item.id === id)) || [];

/** New column spans for the target row and for the row the component leaves. */
const getSpanUpdates = (
  position: DropPosition,
  activeComponent: FormComponentModel,
  overRow: FormComponentModel[],
  activeRow: FormComponentModel[]
) => {
  const draggingInSameRow = overRow === activeRow;
  if (!isVerticalDrop(position) && !(isSideDrop(position) && !draggingInSameRow)) {
    return [];
  }

  const overUpdates = isVerticalDrop(position)
    ? updateColSpans([activeComponent])
    : updateColSpans([...overRow, activeComponent]);
  const remainingActiveRow = activeRow.filter((item) => item.id !== activeComponent.id);

  return [...overUpdates, ...updateColSpans(remainingActiveRow)];
};

const getTargetIndex = (
  { activeIndex, overIndex, position }: DropInfo,
  overRow: FormComponentModel[],
  components: FormComponentModel[]
) => {
  const movingDown = activeIndex < overIndex;
  const indexOf = (item: FormComponentModel) =>
    components.findIndex((component) => component.id === item.id);

  if (position === "top") {
    const first = indexOf(overRow[0]);
    return movingDown ? first - 1 : first;
  }
  if (position === "bottom") {
    const last = indexOf(overRow[overRow.length - 1]);
    return movingDown ? last : last + 1;
  }
  if (position === "left") {
    return overIndex;
  }
  return movingDown ? overIndex : overIndex + 1;
};

/** Applies a canvas drop: adds/moves the dragged component and rebalances column spans. */
export function handleCanvasDragEnd(event: any, ctx: CanvasDragEndContext) {
  const { active, over } = event;
  if (!over) {
    return;
  }

  const activeData = active.data.current;
  const overData = over.data.current;
  const drop: DropInfo = {
    activeIndex: activeData.index,
    overIndex: overData.index,
    position: overData.position,
  };

  const activeComponent =
    activeData.action === "add" ? ctx.addComponent(activeData.component) : activeData.component;

  if (isNoopDrop(drop) || !activeComponent || !overData.component) {
    return;
  }

  const overRow = findRow(ctx.gridRows, overData.component.id);
  const activeRow = findRow(ctx.gridRows, activeData.component?.id);

  getSpanUpdates(drop.position, activeComponent, overRow, activeRow).forEach((item) => {
    ctx.updateComponent(item.id, "properties.style.colSpan", `${item.span}`, false, true);
  });

  ctx.moveComponent(drop.activeIndex, getTargetIndex(drop, overRow, ctx.components));
}
