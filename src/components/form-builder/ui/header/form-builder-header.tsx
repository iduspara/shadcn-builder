"use client";

import {
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
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { UndoRedoButtons } from "../undo-redo-buttons";
import { ThemeToggle } from "@/components/form-builder/ui/theme-toggle";

type BuilderMode = "editor" | "preview" | "editor-preview" | "export";

const VIEWPORT_ITEMS = [
  { value: "lg", icon: Monitor },
  { value: "md", icon: Tablet },
  { value: "sm", icon: Smartphone },
];

const isEditingMode = (mode: BuilderMode): mode is "editor" | "preview" =>
  mode === "editor" || mode === "preview";

/** Menubar on the left, form title (or the rich-text toolbar while editing text) in the middle. */
function HeaderMenus({ mode }: { mode: "editor" | "preview" }) {
  const editor = useFormBuilderStore((state) => state.editor);
  const formTitle = useFormBuilderStore((state) => state.formTitle);

  return (
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
  );
}

function HeaderTools({ mode }: { mode: BuilderMode }) {
  const editor = useFormBuilderStore((state) => state.editor);
  const viewport = useFormBuilderStore((state) => state.viewport);
  const updateViewport = useFormBuilderStore((state) => state.updateViewport);

  return (
    <div
      className={cn(
        "col-span-1 hidden md:flex justify-end items-center gap-4",
        mode === "editor-preview" && "justify-center col-span-7 2xl:col-span-3"
      )}
    >
      {mode !== "export" && !editor && (
        <>
          {mode !== "editor-preview" && <UndoRedoButtons size="sm" variant="ghost" />}
          <ToggleGroupNav
            name="viewport"
            items={VIEWPORT_ITEMS}
            defaultValue={viewport}
            onValueChange={(value) => updateViewport(value as "sm" | "md" | "lg")}
          />
          <ThemeToggle />
        </>
      )}
    </div>
  );
}

function ExitButton({ label }: { label: string }) {
  const updateMode = useFormBuilderStore((state) => state.updateMode);
  return (
    <Button
      variant="default"
      size="sm"
      className="cursor-pointer w-full"
      onClick={() => updateMode("editor")}
    >
      <XIcon className="h-4 w-4" />
      {label}
    </Button>
  );
}

function HeaderActions({ mode }: { mode: BuilderMode }) {
  const components = useFormBuilderStore((state) => state.components);
  const updateMode = useFormBuilderStore((state) => state.updateMode);
  const selectComponent = useFormBuilderStore((state) => state.selectComponent);

  const switchMode = (next: "editor-preview" | "export") => {
    updateMode(next);
    selectComponent(null);
  };

  if (mode === "editor-preview") return <ExitButton label="Exit Preview" />;
  if (mode === "export") return <ExitButton label="Exit Export" />;

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="cursor-pointer flex-1"
        onClick={() => switchMode("editor-preview")}
        disabled={components.length === 0}
      >
        <PlayIcon className="h-4 w-4" />
        Preview
      </Button>
      <Button
        variant="default"
        size="sm"
        className="cursor-pointer flex-1"
        onClick={() => switchMode("export")}
        disabled={components.length === 0}
        id="export-code-button"
      >
        <ExternalLink className="h-4 w-4" />
        Export
      </Button>
    </>
  );
}

export function FormBuilderHeader() {
  const mode = useFormBuilderStore((state) => state.mode);

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
        {isEditingMode(mode) && <HeaderMenus mode={mode} />}
        <HeaderTools mode={mode} />
      </div>
      <div className="hidden md:flex flex-row gap-2 border-l py-2 px-4 w-[300px]">
        <HeaderActions mode={mode} />
      </div>
    </header>
  );
}
