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

const DROP_POSITIONS = ["left", "right", "top", "bottom"] as const;

type BuilderMode = "editor" | "editor-preview" | "preview" | "export";

interface ColumnClassState {
  component: FormComponentModel;
  mode: BuilderMode;
  isDragging: boolean;
  isHidden: boolean;
  hasSelection: boolean;
  isSelected: boolean;
}

function getColumnClassName({ component, mode, isDragging, isHidden, hasSelection, isSelected }: ColumnClassState) {
  return cn(
    "relative group self-end",
    generateTWClassesForAllViewports(component, "colSpan"),
    generateTWClassesForAllViewports(component, "colStart"),
    // Hidden components are only hidden in the plain preview
    mode === "preview" && generateTWClassesForAllViewports(component, "visible"),
    mode === "editor" &&
      "group/component hover:outline-1 hover:outline-offset-6 hover:outline-primary cursor-pointer",
    isDragging && "cursor-grabbing",
    hasSelection && "opacity-30",
    isHidden && "opacity-50",
    isSelected && "outline-1 outline-offset-6 outline-primary z-20 opacity-100"
  );
}

/** Removes a component and lets the rest of its row fill the freed columns. */
function useDeleteComponent() {
  const components = useFormBuilderStore((state) => state.components);
  const viewport = useFormBuilderStore((state) => state.viewport);
  const removeComponent = useFormBuilderStore((state) => state.removeComponent);
  const updateComponent = useFormBuilderStore((state) => state.updateComponent);

  return (id: string) => {
    const row = getGridRows(components, viewport).find((items) => items.some((item) => item.id === id)) || [];
    updateColSpans(row.filter((item) => item.id !== id)).forEach((item) => {
      updateComponent(item.id, "properties.style.colSpan", `${item.span}`, false);
    });
    removeComponent(id);
  };
}

function ColumnToolbar({ component, isSelected, showType }: { component: FormComponentModel; isSelected: boolean; showType: boolean }) {
  const deleteComponent = useDeleteComponent();
  return (
    <>
      {showType && (
        <span
          className={cn(
            "absolute -top-6.5 -left-1.75 py-0.5 px-1 text-xs opacity-0 bg-primary text-accent",
            isSelected && "opacity-100"
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
          isSelected && "opacity-100"
        )}
        onClick={(e) => {
          e.stopPropagation();
          deleteComponent(component.id);
        }}
      >
        <Icons.X className="size-3" />
      </Button>
    </>
  );
}

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

  const viewport = useFormBuilderStore((state) => state.viewport);
  const selectedComponent = useFormBuilderStore((state) => state.selectedComponent);
  const selectComponent = useFormBuilderStore((state) => state.selectComponent);
  const mode = useFormBuilderStore((state) => state.mode);
  const enableDragging = useFormBuilderStore((state) => state.enableDragging);
  const isSelected = selectedComponent?.id === component.id;

  const columnStyle = useMemo(
    () => ({
      columnTransform,
      zIndex: columnIsDragging || isSelected ? 30 : 1,
    }),
    [columnTransform, columnIsDragging, isSelected]
  );

  const className = useMemo(
    () =>
      getColumnClassName({
        component,
        mode,
        isDragging: columnIsDragging,
        isHidden: component.getField("properties.style.visible", viewport) === "no",
        hasSelection: Boolean(selectedComponent),
        isSelected,
      }),
    [component, mode, columnIsDragging, viewport, selectedComponent, isSelected]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (mode === "editor" && !columnIsDragging) {
        e.stopPropagation();
        selectComponent(component);
      }
    },
    [component, selectComponent, mode, columnIsDragging]
  );

  const dragProps = enableDragging && mode === "editor" ? { ...columnAttributes, ...columnListeners } : {};

  return (
    <div
      ref={setNodeRef}
      className={className}
      key={component.id}
      data-component-id={component.id}
      onClick={handleClick}
      {...dragProps}
    >
      {/* Blocks interaction with the rendered component while editing; text stays editable */}
      {component.type !== "text" && (
        <div
          className={cn(
            "absolute top-0 left-0 right-0 bottom-0",
            mode === "editor-preview" && "hidden"
          )}
          style={columnStyle}
        ></div>
      )}

      {DROP_POSITIONS.map((position) => (
        <RowColumnDropzone
          key={position}
          index={index}
          position={position}
          overColumn={columnOver}
          component={component}
        />
      ))}

      <ColumnToolbar component={component} isSelected={isSelected} showType={mode === "editor"} />

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
