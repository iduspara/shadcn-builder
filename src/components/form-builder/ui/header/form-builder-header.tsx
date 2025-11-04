"use client";

import {
  CodeIcon,
  ExternalLink,
  PlayIcon,
  XIcon,
  Monitor,
  Tablet,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToggleGroupNav } from "@/components/form-builder/ui/toggle-group-nav";
import { EditorToolbar } from "@/components/form-builder/form-components/wysiwyg/editor-toolbar";
import { FormBuilderMenubar } from "./form-builder-menubar";
import { cn } from "@/lib/utils";
import Logo from "@/components/landingpage/logo";
import Link from "next/link";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { useMemo } from "react";
import { UndoRedoButtons } from "../undo-redo-buttons";
import { ThemeToggle } from "@/components/form-builder/ui/theme-toggle";

export function FormBuilderHeader() {
  // Get state from store
  const mode = useFormBuilderStore((state) => state.mode);
  const viewport = useFormBuilderStore((state) => state.viewport);
  const showJson = useFormBuilderStore((state) => state.showJson);
  const editor = useFormBuilderStore((state) => state.editor);
  const components = useFormBuilderStore((state) => state.components);
  const formTitle = useFormBuilderStore((state) => state.formTitle);

  // Get actions from store
  const updateViewport = useFormBuilderStore((state) => state.updateViewport);
  const updateMode = useFormBuilderStore((state) => state.updateMode);
  const selectComponent = useFormBuilderStore((state) => state.selectComponent);
  const toggleJsonPreview = useFormBuilderStore(
    (state) => state.toggleJsonPreview
  );

  // Memoize viewport items
  const viewportItems = useMemo(
    () => [
      { value: "lg", icon: Monitor },
      { value: "md", icon: Tablet },
      { value: "sm", icon: Smartphone },
    ],
    []
  );
  return (
    <header
      className={cn(
        "fixed top-0 w-full flex flex-row gap-2 justify-between bg-sidebar border-b z-30"
      )}
    >
      <a
        href="/"
        className="flex flex-row gap-2 items-center justify-center md:justify-start p-2 px-4 border-r w-full md:w-[300px]"
      >
        <Logo />
      </a>
      <div className="p-2 flex-1 grid grid-cols-3">
        {(mode === "editor" || mode === "preview") && (
          <>
            <div className={cn("col-span-1")}>
              {!editor && <FormBuilderMenubar mode={mode} />}
            </div>
            <div className="col-span-1 2xl:col-start-2 flex justify-center items-center">
              {editor ? (
                <EditorToolbar editor={editor} isEditable={true} />
              ) : (
                <small>{formTitle}</small>
              )}
            </div>
          </>
        )}
        <div
          className={cn(
            "col-span-1 hidden md:flex justify-end items-center gap-4",
            editor && "",
            mode === "editor-preview" &&
              "justify-center col-span-7 2xl:col-span-3"
          )}
        >
          {mode !== "export" && !editor && (
            <>
              {mode !== "editor-preview" && (
                <UndoRedoButtons size="sm" variant="ghost" />
              )}
              <ToggleGroupNav
                name="viewport"
                items={viewportItems}
                defaultValue={viewport}
                onValueChange={(value) =>
                  updateViewport(value as "sm" | "md" | "lg")
                }
              />
              <ThemeToggle />
            </>
          )}
        </div>
      </div>
      <div className="hidden md:flex flex-row gap-2 border-l py-2 px-4 w-[300px]">
        {(mode === "editor" || mode === "preview") && (
          <>
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer flex-1"
              onClick={() => {
                updateMode("editor-preview");
                selectComponent(null);
              }}
              disabled={components.length === 0}
            >
              <PlayIcon className="h-4 w-4" />
              Preview
            </Button>
            <Button
              variant="default"
              size="sm"
              className="cursor-pointer flex-1"
              onClick={() => {
                updateMode("export");
                selectComponent(null);
              }}
              disabled={components.length === 0}
              id="export-code-button"
            >
              <ExternalLink className="h-4 w-4" />
              Export
            </Button>
          </>
        )}
        {mode === "editor-preview" && (
          <Button
            variant="default"
            size="sm"
            className="cursor-pointer w-full"
            onClick={() => updateMode("editor")}
          >
            <XIcon className="h-4 w-4" />
            Exit Preview
          </Button>
        )}
        {mode === "export" && (
          <Button
            variant="default"
            size="sm"
            className="cursor-pointer w-full"
            onClick={() => updateMode("editor")}
          >
            <XIcon className="h-4 w-4" />
            Exit Export
          </Button>
        )}
      </div>
    </header>
  );
}
