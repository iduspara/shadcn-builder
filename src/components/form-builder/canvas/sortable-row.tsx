import { UseFormReturn } from "react-hook-form";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, generateTWClassesForAllViewports } from "@/lib/utils";
import { RenderEditorComponent } from "../helpers/render-editor-component";
import { DropdownComponents } from "../helpers/dropdown-components";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { FormRow, Viewports } from "@/types/form-builder.types";
import { FormComponentModel } from "../Models/FormComponent";
import { memo, useCallback, useMemo } from 'react';

interface SortableRowProps {
  row: FormRow;
  index: number;
  form: UseFormReturn<any>;
}

// Memoize the row dropzone component
const RowDropzone = memo(({
  newRow,
  position,
  rowId,
}: {
  newRow?: boolean;
  position?: "before" | "after";
  rowId: number;
}) => (
  <div className="flex items-center justify-center relative mx-8">
    <DropdownComponents
      newRow={newRow}
      {...(position === "before" ? { before: rowId } : { after: rowId })}
      className="z-10 absolute bg-slate-100 rounded-full"
    />
  </div>
));

RowDropzone.displayName = 'RowDropzone';

// Memoize the draggable button component
const DraggableButton = memo(({ attributes, listeners }: any) => (
  <Button
    variant="ghost"
    size="icon"
    className="h-8 w-8 cursor-grab active:cursor-grabbing self-center"
    {...attributes}
    {...listeners}
  >
    <GripVertical className="h-4 w-4 text-slate-400" />
  </Button>
));

DraggableButton.displayName = 'DraggableButton';

// Memoize the row column component
const RowColumn = memo(({
  component,
  index,
  viewport,
  row,
  form,
  isLast,
}: {
  component: FormComponentModel;
  index: number;
  viewport: Viewports;
  row: FormRow;
  form: UseFormReturn<any>;
  isLast: boolean;
}) => {
  const {
    attributes: columnAttributes,
    listeners: columnListeners,
    setNodeRef,
    transform: columnTransform,
    transition: columnTransition,
    isDragging: columnIsDragging,
  } = useSortable({
    id: component.id,
  });

  const selectedComponent = useFormBuilderStore(state => state.selectedComponent);
  const selectComponent = useFormBuilderStore(state => state.selectComponent);
  
  const columnStyle = useMemo(() => ({
    transform: columnTransform
      ? `translate3d(${columnTransform.x}px, 0, 0)`
      : undefined,
    transition: columnTransition,
    zIndex: columnIsDragging ? 30 : 1,
    ...(selectedComponent?.id === component.id ? { zIndex: 30 } : undefined),
  }), [columnTransform, columnTransition, columnIsDragging, selectedComponent, component]);

  const colSpanClasses = useMemo(() => 
    generateTWClassesForAllViewports(component, "colSpan", row),
    [component, row]
  );
  
  const colStartClasses = useMemo(() => 
    generateTWClassesForAllViewports(component, "colStart", row),
    [component, row]
  );



  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    selectedComponent?.id !== component.id && selectComponent(component);
  }, [component, selectedComponent, selectComponent]);

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "relative  group hover:ring-1 hover:ring-slate-200 p-2 rounded cursor-pointer",
        selectedComponent?.id === component.id && "ring-2 ring-indigo-400 hover:ring-indigo-400 hover:ring-2 bg-white",
        colSpanClasses,
        colStartClasses
      )}
      style={columnStyle}
      key={component.id}
      onClick={handleClick}
      data-component-id={component.id}
    >
      <RenderEditorComponent
        key={component.id}
        index={index}
        isLast={isLast}
        row={row}
        component={component}
        form={form}
        dndAttributes={columnAttributes}
        dndListeners={columnListeners}
      />
    </div>
  );
});

RowColumn.displayName = 'RowColumn';

export const SortableRow = memo(({
  row,
  index,
  form,
}: SortableRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: row.id });

  // Split store selectors
  const updateRow = useFormBuilderStore(state => state.updateRow);
  const selectedRow = useFormBuilderStore(state => state.selectedRow);
  const viewport = useFormBuilderStore(state => state.viewport);

  const style = useMemo(() => ({
    transform: transform ? `translate3d(0, ${transform.y}px, 0)` : undefined,
    transition,
    zIndex: isDragging ? 100 : 0,
    ...(isDragging ? { zIndex: 20 } : undefined),
  }), [transform, transition, isDragging]);

  const handleColumnDragEnd = useCallback((event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = row.components.findIndex(
        (component) => component.id === active.id
      );
      const newIndex = row.components.findIndex(
        (component) => component.id === over.id
      );
      const newComponents = arrayMove(row.components, oldIndex, newIndex);
      const newRow = { ...row, components: newComponents };
      updateRow(newRow);
    }
  }, [row, updateRow]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("group")}
      key={row.id}
    >
      {index === 0 && !isDragging && <RowDropzone newRow rowId={row.id} position="before" />}
      <div className="flex items-center">
        <DraggableButton attributes={attributes} listeners={listeners} />
        <div
          className={cn(
            "form-row flex-1 grid grid-cols-12 p-4 bg-white ring ring-slate-200",
            selectedRow?.id === row.id && "bg-slate-100"
          )}
        >
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleColumnDragEnd}
          >
            <SortableContext
              items={row.components.map((component) => component.id)}
              strategy={horizontalListSortingStrategy}
            >
              {row.components.map((component, index) => (
                <RowColumn
                  key={component.id}
                  component={component}
                  index={index}
                  viewport={viewport}
                  row={row}
                  form={form}
                  isLast={index === row.components.length - 1}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
        <div className="w-8">
          <DropdownComponents
            rowId={row.id}
            className={cn("z-10 rounded-full -translate-x-3 bg-slate-100", isDragging && "hidden")}
          />
        </div>
      </div>
      {!isDragging && <RowDropzone newRow rowId={row.id} position="after" />}
    </div>
  );
});

SortableRow.displayName = 'SortableRow';
