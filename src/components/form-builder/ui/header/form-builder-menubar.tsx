"use client";

import { useState } from "react";
import {
  Loader2,
  Save,
  Copy,
  FolderOpen,
  LogOut,
  Undo,
  Redo,
  Trash2,
  ExternalLink,
  Clock,
  FileText,
  Smartphone,
  Tablet,
  Monitor,
  Code,
  BookOpen,
  Info,
  Bug,
  Braces,
  Palette,
  Upload,
  RotateCcw,
} from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { LoadFormDialog } from "@/components/form-builder/dialogs/load-form-dialog";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { useSaveForm } from "@/hooks/use-save-form";
import { FormComponentModel } from "@/models/FormComponent";
import { useSavedForms } from "@/hooks/use-saved-forms";
import { SaveFormDialog } from "@/components/form-builder/dialogs/save-form-dialog";
import { toast } from "sonner";
import { LoadTemplateDialog } from "../../dialogs/load-template-dialog";
import { useHistory } from "@/hooks/use-history";
import { Play } from "lucide-react";
import { ThemeConfigDialog } from "../../dialogs/theme-config-dialog";
import { useUserThemes, useApplyTheme } from "@/hooks/use-themes";
import { ManageThemesDialog } from "../../dialogs/manage-themes-dialog";

type MenubarDialog =
  | "open"
  | "open-template"
  | "save"
  | "save-as"
  | "theme-import"
  | "theme-manage";

type OpenDialog = (dialog: MenubarDialog) => void;

interface FormBuilderMenubarProps {
  mode: "editor" | "preview" | "editor-preview" | "export";
}

const HOUR_MS = 1000 * 60 * 60;

/** Time for today, weekday within a week, otherwise month and day. */
function formatRecentDate(timestamp: number) {
  const date = new Date(timestamp);
  const diffInHours = (Date.now() - date.getTime()) / HOUR_MS;

  if (diffInHours < 24) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  if (diffInHours < 168) {
    return date.toLocaleDateString([], { weekday: "short" });
  }
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

const CheckMark = () => <span className="ml-auto text-xs">✓</span>;

function RecentFormsSubmenu({ userForms, isLoading }: ReturnType<typeof useSavedForms>) {
  const { updateComponents, updateFormTitle, updateMode, updateFormId, clearHistory } =
    useFormBuilderStore();

  const handleLoadRecentForm = async (form: any) => {
    try {
      // Convert stored component data back to FormComponentModel instances
      const components = form.components.map(
        (componentData: any) => new FormComponentModel(componentData)
      );

      clearHistory();
      updateFormId(form._id);
      updateFormTitle(form.title);
      updateMode("editor");
      updateComponents(components);
    } catch (error) {
      console.error("Error loading recent form:", error);
      toast.error("Failed to load form. Please try again.");
    }
  };

  // The 5 most recent forms
  const recentForms = userForms.slice(0, 5);

  return (
    <MenubarSub>
      <MenubarSubTrigger>
        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
        Recent
      </MenubarSubTrigger>
      <MenubarSubContent>
        {isLoading ? (
          <MenubarItem disabled>
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading...
          </MenubarItem>
        ) : recentForms.length === 0 ? (
          <MenubarItem disabled>No recent forms</MenubarItem>
        ) : (
          recentForms.map((form) => (
            <div key={form._id}>
              <MenubarItem onClick={() => handleLoadRecentForm(form)}>
                <FileText className="h-4 w-4" />
                <span className="truncate max-w-[200px] flex-1 mr-4">
                  {form.title}
                </span>
                <small className="text-xs text-muted-foreground self-end">
                  {formatRecentDate(form.createdAt)}
                </small>
              </MenubarItem>
            </div>
          ))
        )}
      </MenubarSubContent>
    </MenubarSub>
  );
}

function FileMenu({ openDialog }: { openDialog: OpenDialog }) {
  const formId = useFormBuilderStore((state) => state.formId);
  const { updateMode, updateFormId } = useFormBuilderStore();
  const { saveCurrentForm, isSaving, canSave } = useSaveForm();
  // Fetched here (always mounted) so recent forms are ready when the menu opens
  const savedForms = useSavedForms();
  const saveDisabled = isSaving || !canSave;

  const handleSave = async () => {
    if (!canSave) return;

    // Already-saved forms are saved in place; new forms go through the dialog
    if (!formId) {
      openDialog("save");
      return;
    }

    try {
      const newFormId = await saveCurrentForm();
      updateFormId(newFormId);
      toast.success("Form saved successfully!");
    } catch (error) {
      console.error("Error saving form:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save form. Please try again.",
      );
    }
  };

  return (
    <MenubarMenu>
      <MenubarTrigger className="gap-2">File</MenubarTrigger>
      <MenubarContent align="start" className="w-48">
        <MenubarItem onClick={() => openDialog("open")}>
          <FolderOpen className="h-4 w-4" />
          Open
        </MenubarItem>
        <MenubarItem onClick={() => openDialog("open-template")}>
          <FolderOpen className="h-4 w-4" />
          Open Template
        </MenubarItem>
        <RecentFormsSubmenu {...savedForms} />
        <MenubarSeparator />
        <MenubarItem onClick={handleSave} disabled={saveDisabled}>
          <Save className="h-4 w-4" />
          Save
        </MenubarItem>

        <MenubarItem onClick={() => openDialog("save-as")} disabled={saveDisabled}>
          <Save className="h-4 w-4" />
          Save As
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem onClick={() => updateMode("export")}>
          <ExternalLink className="h-4 w-4" />
          Export
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem onClick={() => (window.location.href = "/")}>
          <LogOut className="h-4 w-4" />
          Exit
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
}

function EditMenu() {
  const selectedComponent = useFormBuilderStore((state) => state.selectedComponent);
  const components = useFormBuilderStore((state) => state.components);
  const { duplicateComponent, clearForm } = useFormBuilderStore();
  const { undo, redo, canUndo, canRedo } = useHistory();

  const handleDuplicate = () => {
    if (selectedComponent) {
      duplicateComponent(selectedComponent.id);
      toast.success("Component duplicated successfully!");
    }
  };

  return (
    <MenubarMenu>
      <MenubarTrigger className="gap-2">Edit</MenubarTrigger>
      <MenubarContent align="start" className="w-48">
        <MenubarItem onClick={undo} disabled={!canUndo}>
          <Undo className="h-4 w-4" />
          Undo
        </MenubarItem>
        <MenubarItem onClick={redo} disabled={!canRedo}>
          <Redo className="h-4 w-4" />
          Redo
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem onClick={handleDuplicate} disabled={!selectedComponent}>
          <Copy className="h-4 w-4" />
          Duplicate
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem onClick={clearForm} disabled={components.length === 0}>
          <Trash2 className="h-4 w-4" />
          Clear Form
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
}

const VIEWPORT_ITEMS = [
  { viewport: "sm", label: "Mobile", Icon: Smartphone },
  { viewport: "md", label: "Tablet", Icon: Tablet },
  { viewport: "lg", label: "Desktop", Icon: Monitor },
] as const;

function ViewMenu() {
  const viewport = useFormBuilderStore((state) => state.viewport);
  const showJson = useFormBuilderStore((state) => state.showJson);
  const components = useFormBuilderStore((state) => state.components);
  const { updateMode, updateViewport, toggleJsonPreview } = useFormBuilderStore();
  const isEmpty = !components.length;

  return (
    <MenubarMenu>
      <MenubarTrigger className="gap-2">View</MenubarTrigger>
      <MenubarContent align="start" className="w-48">
        {VIEWPORT_ITEMS.map(({ viewport: value, label, Icon }) => (
          <MenubarItem
            key={value}
            onClick={() => updateViewport(value)}
            className={viewport === value ? "bg-accent" : ""}
          >
            <Icon className="h-4 w-4" />
            {label}
            {viewport === value && <CheckMark />}
          </MenubarItem>
        ))}
        <MenubarSeparator />
        <MenubarItem onClick={() => updateMode("editor-preview")} disabled={isEmpty}>
          <Play className="h-4 w-4" />
          Live Preview
        </MenubarItem>
        <MenubarItem onClick={() => updateMode("export")} disabled={isEmpty}>
          <Code className="h-4 w-4" />
          Generated Code
        </MenubarItem>
        <MenubarItem
          onClick={toggleJsonPreview}
          className={showJson ? "bg-accent" : ""}
          disabled={isEmpty}
        >
          <Braces className="h-4 w-4" />
          Form JSON
          {showJson && <CheckMark />}
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
}

function ThemeMenu({ openDialog }: { openDialog: OpenDialog }) {
  const { themes, isLoading: isLoadingThemes } = useUserThemes();
  const { applyTheme, removeTheme } = useApplyTheme();
  const currentTheme = useFormBuilderStore((state) => state.currentTheme);

  const handleApplyTheme = (css: string) => {
    applyTheme(css);
    toast.success("Theme applied successfully!");
  };

  const handleResetTheme = () => {
    removeTheme();
    toast.success("Theme reset to default!");
  };

  return (
    <MenubarMenu>
      <MenubarTrigger className="gap-2">Theme</MenubarTrigger>
      <MenubarContent align="start" className="w-48">
        <MenubarItem onClick={() => openDialog("theme-import")}>
          <Upload className="h-4 w-4" />
          Import
        </MenubarItem>

        <MenubarItem
          onClick={() => openDialog("theme-manage")}
          disabled={isLoadingThemes || themes.length === 0}
        >
          <Palette className="h-4 w-4" />
          Manage
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem onClick={handleResetTheme} disabled={isLoadingThemes || !currentTheme}>
          <RotateCcw className="h-4 w-4" />
          Reset to Default
        </MenubarItem>
        {isLoadingThemes ? (
          <MenubarItem disabled>
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading themes...
          </MenubarItem>
        ) : (
          themes.map((theme) => (
            <MenubarItem
              key={theme._id}
              onClick={() => handleApplyTheme(theme.css)}
              className={currentTheme === theme.css ? "bg-accent" : ""}
            >
              <Palette className="h-4 w-4" />
              {theme.name}
              {currentTheme === theme.css && <CheckMark />}
            </MenubarItem>
          ))
        )}
      </MenubarContent>
    </MenubarMenu>
  );
}

function HelpMenu() {
  return (
    <MenubarMenu>
      <MenubarTrigger className="gap-2">Help</MenubarTrigger>
      <MenubarContent align="start" className="w-48">
        <MenubarItem onClick={() => window.open("/faq", "_blank")}>
          <BookOpen className="h-4 w-4" />
          FAQ
        </MenubarItem>
        <MenubarItem
          onClick={() =>
            window.open(
              "https://github.com/iduspara/shadcn-builder/issues/new",
              "_blank",
            )
          }
        >
          <Bug className="h-4 w-4" />
          Bug Report
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem onClick={() => window.open("/about", "_blank")}>
          <Info className="h-4 w-4" />
          About
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
}

export function FormBuilderMenubar({ mode }: FormBuilderMenubarProps) {
  const [activeDialog, setActiveDialog] = useState<MenubarDialog | null>(null);

  const dialogProps = (dialog: MenubarDialog) => ({
    open: activeDialog === dialog,
    onOpenChange: (open: boolean) => setActiveDialog(open ? dialog : null),
  });

  // Only render if in editor or preview mode
  if (mode !== "editor" && mode !== "preview") {
    return null;
  }

  return (
    <>
      <Menubar className="border-none p-0 shadow-none bg-sidebar">
        <FileMenu openDialog={setActiveDialog} />
        <EditMenu />
        <ViewMenu />
        <ThemeMenu openDialog={setActiveDialog} />
        <HelpMenu />
      </Menubar>
      <LoadFormDialog {...dialogProps("open")} />
      <LoadTemplateDialog {...dialogProps("open-template")} />
      <SaveFormDialog {...dialogProps("save")} />
      <SaveFormDialog forceSave {...dialogProps("save-as")} />
      <ThemeConfigDialog {...dialogProps("theme-import")} />
      <ManageThemesDialog {...dialogProps("theme-manage")} />
    </>
  );
}
