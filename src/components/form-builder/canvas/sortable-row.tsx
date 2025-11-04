"use client";

import { UseFormReturn } from "react-hook-form";
import { GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  cn,
  generateTWClassesForAllViewports,
  getGridRows,
  updateColSpans,
} from "@/lib/utils";
import { RenderEditorComponent } from "../helpers/render-editor-component";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { Over, useDraggable, useDroppable } from "@dnd-kit/core";
import { FormComponentModel } from "@/models/FormComponent";
import { memo, useCallback, useMemo } from "react";
import * as Icons from "lucide-react";

interface SortableRowProps {
  component: FormComponentModel;
  index: number;
  form: UseFormReturn<any>;
}

// Memoize the draggable button component
const DraggableButton = memo(({ attributes, listeners }: any) => (
  <div
    className="h-6 w-6 cursor-grab active:cursor-grabbing self-center group-hover/row:opacity-100 opacity-0 flex items-center justify-center"
    {...attributes}
    {...listeners}
  >
    <GripVertical className="h-4 w-4 text-slate-400" />
  </div>
));

DraggableButton.displayName = "DraggableButton";

// Memoize the row column component
export const RowColumn = ({ component, index, form }: SortableRowProps) => {
  const {
    attributes: columnAttributes,
    listeners: columnListeners,
    setNodeRef,
    transform: columnTransform,
    isDragging: columnIsDragging,
    over: columnOver,
  } = useDraggable({
    id: component.id,
    data: {
      component,
      index,
      action: "move",
    },
  });

  const components = useFormBuilderStore((state) => state.components);
  const viewport = useFormBuilderStore((state) => state.viewport);
  const selectedComponent = useFormBuilderStore(
    (state) => state.selectedComponent
  );
  const selectComponent = useFormBuilderStore((state) => state.selectComponent);
  const removeComponent = useFormBuilderStore((state) => state.removeComponent);
  const updateComponent = useFormBuilderStore((state) => state.updateComponent);
  const mode = useFormBuilderStore((state) => state.mode);
  const enableDragging = useFormBuilderStore((state) => state.enableDragging);
  const columnStyle = useMemo(
    () => ({
      columnTransform,
      zIndex: columnIsDragging ? 30 : 1,
      ...(selectedComponent?.id === component.id ? { zIndex: 30 } : undefined),
    }),
    [columnTransform, columnIsDragging, selectedComponent, component]
  );

  const colSpanClasses = useMemo(
    () => generateTWClassesForAllViewports(component, "colSpan"),
    [component]
  );

  const colStartClasses = useMemo(
    () => generateTWClassesForAllViewports(component, "colStart"),
    [component]
  );

  const visibilityClasses = useMemo(
    () => generateTWClassesForAllViewports(component, "visible"),
    [component]
  );

  const isHidden =
    component.getField("properties.style.visible", viewport) === "no";

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (mode === "editor" && !columnIsDragging) {
        e.stopPropagation();
        selectComponent(component);
      }
    },
    [component, selectComponent, mode, columnIsDragging]
  );

  const handleDelete = (id: string) => {
    const gridRows = getGridRows(components, viewport);
    let activeRowItems =
      gridRows.find((row) => row.some((item) => item.id === id)) || [];

    activeRowItems = activeRowItems.filter((item) => item.id !== id);

    const updatedActiveItems = updateColSpans([...activeRowItems]);

    updatedActiveItems.forEach((item) => {
      updateComponent(
        item.id,
        "properties.style.colSpan",
        `${item.span}`,
        false
      );
    });

    removeComponent(id);
  };

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "relative group self-end",
        colSpanClasses,
        colStartClasses,
        mode === "editor-preview" || mode === "preview" && visibilityClasses,
        mode === "editor" &&
          "group/component hover:outline-1 hover:outline-offset-6 hover:outline-primary cursor-pointer",
        columnIsDragging && "cursor-grabbing",
        selectedComponent && "opacity-30",
        isHidden && "opacity-50",
        selectedComponent?.id === component.id &&
          "outline-1 outline-offset-6 outline-primary z-20 opacity-100"
      )}
      key={component.id}
      data-component-id={component.id}
      onClick={handleClick}
      {...(enableDragging && mode === "editor" ? columnAttributes : {})}
      {...(enableDragging && mode === "editor" ? columnListeners : {})}
    >
      {component.category === "form" && (
        <div
          className={cn(
            "absolute top-0 left-0 right-0 bottom-0",
            mode === "editor-preview" && "hidden"
          )}
          style={columnStyle}
        ></div>
      )}

      <RowColumnDropzone
        index={index}
        position={"left"}
        overColumn={columnOver}
        component={component}
      />
      <RowColumnDropzone
        index={index}
        position={"right"}
        overColumn={columnOver}
        component={component}
      />
      <RowColumnDropzone
        index={index}
        position={"top"}
        overColumn={columnOver}
        component={component}
      />
      <RowColumnDropzone
        index={index}
        position={"bottom"}
        overColumn={columnOver}
        component={component}
      />

      {mode === "editor" && (
        <span
          className={cn(
            "absolute -top-6.5 -left-1.75 py-0.5 px-1 text-xs opacity-0 bg-primary text-accent",
            component.id === selectedComponent?.id && "opacity-100"
          )}
        >
          {component.getField("type")}
        </span>
      )}

      <Button
        type="button"
        variant="link"
        size="icon"
        className={cn(
          "h-4 w-4 absolute -right-1.75 -top-5.5 m-0! hover:bg-primary/50 group-hover/component:opacity-100 opacity-0 cursor-pointer bg-primary text-accent rounded-none",
          component.id === selectedComponent?.id && "opacity-100"
        )}
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(component.id);
        }}
      >
        <Icons.X className="size-3" />
      </Button>

      <RenderEditorComponent
        key={component.id}
        component={component}
        form={form}
      />
    </div>
  );
};

RowColumn.displayName = "RowColumn";

const RowColumnDropzone = ({
  index,
  position,
  overColumn,
  component,
}: {
  index: number;
  position: "left" | "right" | "top" | "bottom" | null;
  overColumn: Over | null;
  component: FormComponentModel;
}) => {
  const customId = `${index}-${position}`;
  const overColumnId = overColumn?.id;
  const { setNodeRef } = useDroppable({
    id: customId,
    data: {
      index,
      position,
      component,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        " bg-primary absolute opacity-0 rounded-full",
        overColumnId === customId && "opacity-100",
        position === "top" && "left-0 -top-2.25 right-0 h-0.5",
        position === "bottom" && "left-0 -bottom-2.25 right-0 h-0.5",
        position === "left" && "-left-2.25 top-0 bottom-0 w-0.5",
        position === "right" && "-right-2.25 top-0 bottom-0 w-0.5"
      )}
    ></div>
  );
};

RowColumnDropzone.displayName = "RowColumnDropzone";
