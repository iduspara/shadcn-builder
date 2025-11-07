"use client";

import {
  closestCenter,
  DndContext,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
} from "@dnd-kit/core";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarLeft } from "@/components/form-builder/sidebar/sidebarLeft";
import { SidebarRight } from "@/components/form-builder/sidebar/sidebarRight";
import { MainCanvas } from "@/components/form-builder/mainCanvas";
import { Loader2 } from "lucide-react";
import { FormBuilderHeader } from "@/components/form-builder/ui/header/form-builder-header";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { useCallback, useMemo, useState, useEffect } from "react";
import { MainExport } from "@/components/form-builder/dialogs/generate-code-dialog";
import { MobileNotification } from "@/components/form-builder/ui/mobile-notification";
import { useIsMobile } from "@/hooks/use-mobile";
import SocialLinks from "@/components/form-builder/sidebar/socialLinks";
import { WelcomeDialog } from "@/components/form-builder/dialogs/welcome-dialog";
import { cn, getGridRows, updateColSpans } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useAuthState } from "@/hooks/use-auth";

export default function FormBuilderPage() {
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();

  // Split the store selectors to only subscribe to what we need
  const mode = useFormBuilderStore((state) => state.mode);
  const viewport = useFormBuilderStore((state) => state.viewport);
  const loadedTemplateId = useFormBuilderStore(
    (state) => state.loadedTemplateId
  );
  const loadTemplate = useFormBuilderStore((state) => state.loadTemplate);
  const components = useFormBuilderStore((state) => state.components);
  const selectComponent = useFormBuilderStore((state) => state.selectComponent);
  const formTitle = useFormBuilderStore((state) => state.formTitle);
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(false);
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);
  const { isLoading } = useAuthState();

  const [draggingDOMElement, setDraggingDOMElement] =
    useState<HTMLElement | null>(null);

  // Check for template parameter in URL and load template
  useEffect(() => {
    const template = searchParams.get("template");
    const templateKey = searchParams.get("key");

    if (template && loadedTemplateId !== templateKey && !isLoadingTemplate) {
      setIsLoadingTemplate(true);
      loadTemplate(template, templateKey || undefined)
        .then((success) => {
          if (success) {
            console.log(
              `Template loaded successfully: ${template}${templateKey ? ` (${templateKey})` : ""}`
            );
          } else {
            window.location.href = "/";
          }
        })
        .catch((error) => {
          console.error("Error loading template:", error);
          window.location.href = "/";
        })
        .finally(() => {
          setIsLoadingTemplate(false);
        });
    }
  }, [isLoadingTemplate, loadTemplate, loadedTemplateId, searchParams]);

  // Show welcome dialog when no template is loaded and no components exist
  useEffect(() => {
    // Don't show if we're loading a template or if we're not in editor mode
    if (isLoadingTemplate || mode !== "editor") {
      return;
    }

    // Don't show if there's a template parameter in URL (loading in progress)
    const template = searchParams.get("template");
    if (template) {
      return;
    }

    // Show if no template loaded and no components
    const shouldShow = !loadedTemplateId && components.length === 0 && !formTitle;
    setShowWelcomeDialog(shouldShow);
  }, [
    isLoadingTemplate,
    mode,
    loadedTemplateId,
    components.length,
    searchParams,
    formTitle,
  ]);

  const updateComponent = useFormBuilderStore((state) => state.updateComponent);
  const moveComponent = useFormBuilderStore((state) => state.moveComponent);
  const addComponent = useFormBuilderStore((state) => state.addComponent);
  const gridRows = getGridRows(components, viewport);

  // Create sensors outside of callback
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 20,
    },
  });

  // Memoize sensors array
  const sensors = useMemo(() => [pointerSensor], [pointerSensor]);

  // Memoize drag end handler
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const action: "move" | "add" = active.data.current.action;
    let activeComponent = active.data.current.component;
    const overComponent = over.data.current.component;
    const position = over.data.current.position;
    const activeIndex = active.data.current.index;
    const overIndex = over.data.current.index;

    if (action === "add") {
      activeComponent = addComponent(active.data.current.component);
    }

    if (
      (activeIndex === overIndex &&
        (position === "left" || position === "right")) ||
      // Or the diff between active and over is 1
      (activeIndex - overIndex === 1 && position === "bottom") ||
      (overIndex - activeIndex === 1 && position === "top")
    ) {
      return;
    }

    if (activeComponent && overComponent) {
      const overRowItems =
        gridRows.find((row) =>
          row.some((item) => item.id === over.data.current?.component.id)
        ) || [];

      const overRowFirstItemIndex = components.findIndex(
        (component) => component.id === overRowItems[0].id
      );

      const overRowLastItemIndex = components.findIndex(
        (component) => component.id === overRowItems[overRowItems.length - 1].id
      );

      let activeRowItems =
        gridRows.find((row) =>
          row.some((item) => item.id === active.data.current?.component.id)
        ) || [];

      let draggingInSameRow = overRowItems === activeRowItems;

      // Don´t update the spans if the component is being dragged in the same row
      activeRowItems = activeRowItems.filter(
        (item) => item.id !== activeComponent.id
      );
      let updatedOverItems = [];

      if (position === "top" || position === "bottom") {
        updatedOverItems = updateColSpans([activeComponent]);
      } else {
        updatedOverItems = updateColSpans([...overRowItems, activeComponent]);
      }

      if (
        (!draggingInSameRow && (position === "left" || position === "right")) ||
        position === "top" ||
        position === "bottom"
      ) {
        updatedOverItems.forEach((item) => {
          updateComponent(
            item.id,
            "properties.style.colSpan",
            `${item.span}`,
            false,
            true
          );
        });

        const updatedActiveItems = updateColSpans([...activeRowItems]);

        updatedActiveItems.forEach((item) => {
          updateComponent(
            item.id,
            "properties.style.colSpan",
            `${item.span}`,
            false,
            true
          );
        });
      }

      const oldIndex = active.data.current.index;
      let newIndex =
        position === "left"
          ? overIndex
          : activeIndex < overIndex
            ? overIndex
            : overIndex + 1;

      if (position === "top") {
        newIndex =
          activeIndex < overIndex
            ? overRowFirstItemIndex - 1
            : overRowFirstItemIndex;
      }

      if (position === "bottom") {
        newIndex =
          activeIndex < overIndex
            ? overRowLastItemIndex
            : overRowLastItemIndex + 1;
      }

      moveComponent(oldIndex, newIndex);
    }
  };

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      selectComponent(null);
      const element = document.querySelector(
        `[data-item-id="${event.active.data.current?.component.id}"]`
      );
      if (element) {
        setDraggingDOMElement(element as HTMLElement);
      }
    },
    [selectComponent]
  );

  // Show loading state while template is being loaded
  if (isLoadingTemplate || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
      <div>
        <FormBuilderHeader />
        {isMobile ? (
        <>
          <MobileNotification />
          <div className="fixed bottom-0 w-full p-4 border-t">
            <SocialLinks />
          </div>
        </>
      ) : (
        <SidebarProvider
          className="relative hidden md:block"
          style={{ "--sidebar-width": "300px" } as React.CSSProperties}
          open={mode === "editor" || mode === "preview"}
        >
          <DndContext
            id="form-builder"
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
          >
            <div className="flex w-full h-screen justify-between">
              <SidebarLeft />
              <main
                className={cn(
                  "flex-1 transition-all duration-300 overflow-auto relative bg-dotted pt-14 scrollbar-hide"
                )}
              >
                {mode === "export" ? <MainExport /> : <MainCanvas />}
              </main>
              <SidebarRight />
            </div>
            <DragOverlay>
              {draggingDOMElement && (
                <div className="bg-white p-2 rounded-md shadow opacity-80">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: draggingDOMElement.innerHTML,
                    }}
                    className="max-h-52 overflow-hidden"
                  />
                </div>
              )}
            </DragOverlay>
          </DndContext>
        </SidebarProvider>
      )}

        {/* Welcome Dialog */}
        <WelcomeDialog
          open={showWelcomeDialog}
          onOpenChange={setShowWelcomeDialog}
        />
      </div>
  );
}
