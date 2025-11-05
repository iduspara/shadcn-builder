"use client";

import { useFormBuilderStore } from "@/stores/form-builder-store";
import { useMemo, memo } from "react";
import GenerateCanvasGrid from "./canvas/generate-canvas-grid";
import { Pre } from "@/components/ui/pre";
import { generateJsonSchema } from "./helpers/generate-json";
import { cn } from "@/lib/utils";
import { CardContent } from "../ui/card";
import { Card } from "../ui/card";
import { FormComponentModel } from "@/models/FormComponent";
import { useDroppable } from "@dnd-kit/core";

const viewportEditorStyles = {
  sm: "w-[370px]",
  md: "w-[818px]",
  lg: "w-[1074px]",
} as const;

const JsonPreview = memo(
  ({ components }: { components: FormComponentModel[] }) => {
    const jsonString = useMemo(
      () => JSON.stringify(generateJsonSchema(components), null, 2),
      [components]
    );

    return (
      <div className="absolute top-0 right-0 h-full w-full">
        <Pre language="json" code={jsonString} />
      </div>
    );
  }
);

JsonPreview.displayName = "JsonPreview";

const EmptyState = memo(() => {
  const { setNodeRef, isOver } = useDroppable({
    id: "empty-state",
    data: {
      index: 0,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "p-6 mt-6 text-center text-sm text-muted-foreground bg-black/5 rounded-lg max-w-md mx-auto border-dashed border-2 border-slate-300 dark:bg-muted/50 dark:border-muted",
        isOver && "border-primary"
      )}
    >
      Please add a new component here
    </div>
  );
});

EmptyState.displayName = "EmptyState";

export function MainCanvas() {
  const viewport = useFormBuilderStore((state) => state.viewport);
  const showJson = useFormBuilderStore((state) => state.showJson);
  const selectedComponent = useFormBuilderStore(
    (state) => state.selectedComponent
  );
  const selectComponent = useFormBuilderStore((state) => state.selectComponent);
  const components = useFormBuilderStore((state) => state.components);
  const enableDragging = useFormBuilderStore((state) => state.enableDragging);

  const handleCanvasClick = () => {
    if (selectedComponent && enableDragging) {
      selectComponent(null);
    }
  };

  return components.length > 0 ? (
    <div
      className="flex gap-4 h-full flex-col 3xl:flex-row"
    >
      <div className="h-full w-full" onClick={handleCanvasClick}>
        <Card
          className={cn(
            "transition-all duration-300",
            viewportEditorStyles[viewport],
            "mx-auto scrollbar-hide mt-6"
          )}
        >
          <CardContent>
            <GenerateCanvasGrid components={components} />
          </CardContent>
        </Card>
      </div>
      {showJson && <JsonPreview components={components} />}
    </div>
  ) : (
    <EmptyState />
  );
}
