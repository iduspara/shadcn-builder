"use client";

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
} from "@dnd-kit/core";
import { SortableRow } from "@/components/form-builder/canvas/sortable-row";
import {
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Form } from "@/components/ui/form";
import { SortableContext } from "@dnd-kit/sortable";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { useForm } from "react-hook-form";
import { useMemo, memo, useCallback, useEffect } from "react";
import { FormRow } from "@/types/form-builder.types";
import { Geist } from "next/font/google";
// Memoize the empty state component
const EmptyState = memo(() => (
  <div className="mt-10 p-6 text-center text-sm text-muted-foreground bg-black/5 rounded-lg max-w-md mx-auto border-dashed border-2 border-slate-300">
    Please add a component to the form
  </div>
));

EmptyState.displayName = "EmptyState";

const geist = Geist({ subsets: ["latin"] });

// Memoize the sortable rows list
const SortableRowsList = memo(
  ({ rows, form }: { rows: FormRow[]; form: any }) => (
    <SortableContext
      items={rows.map((row) => row.id)}
      strategy={verticalListSortingStrategy}
    >
      {rows.map((row, index) => (
        <SortableRow key={row.id} row={row} index={index} form={form} />
      ))}
    </SortableContext>
  )
);

SortableRowsList.displayName = "SortableRowsList";

// Memoize static viewport styles
const viewportEditorStyles = {
  sm: "w-[418px]",
  md: "w-[866px]",
  lg: "w-[1134px]",
} as const;

export default function GenerateEditorMode() {
  // Split store selectors to minimize re-renders
  const rows = useFormBuilderStore((state) => state.rows);
  const selectComponent = useFormBuilderStore((state) => state.selectComponent);
  const selectedComponent = useFormBuilderStore(
    (state) => state.selectedComponent
  );
  const updateRows = useFormBuilderStore((state) => state.updateRows);
  const viewport = useFormBuilderStore((state) => state.viewport);

  const form = useForm();

  // Create sensors outside of callback
  const pointerSensor = useSensor(PointerSensor);
  const keyboardSensor = useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
  });

  // Memoize sensors array
  const sensors = useMemo(
    () => [pointerSensor, keyboardSensor],
    [pointerSensor, keyboardSensor]
  );

  // Memoize drag end handler
  const handleDragEnd = useCallback(
    (event: any) => {
      const { active, over } = event;

      if (active.id !== over.id) {
        const oldIndex = rows.findIndex((row) => row.id === active.id);
        const newIndex = rows.findIndex((row) => row.id === over.id);
        const newRows = arrayMove(rows, oldIndex, newIndex);
        updateRows(newRows);
      }
    },
    [rows, updateRows]
  );

  if (rows.length === 0) {
    return <EmptyState />;
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    selectComponent(null);
  };

  
  return (
    <div
      className={`px-6 pt-6 pb-24 ${viewportEditorStyles[viewport]} ${geist.className} mx-auto`}
      onClick={handleClick}
    >
      {selectedComponent && (
        <div
          className={`bg-slate-200/50 w-full z-10 fixed inset-0`}
        ></div>
      )}
      <Form {...form}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableRowsList rows={rows} form={form} />
        </DndContext>
      </Form>
    </div>
  );
}
