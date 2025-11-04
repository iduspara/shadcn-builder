"use client";

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
  Eye,
  Code,
  BookOpen,
  Info,
  Bug,
  Braces,
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

interface FormBuilderMenubarProps {
  mode: "editor" | "preview" | "editor-preview" | "export";
}

export function FormBuilderMenubar({ mode }: FormBuilderMenubarProps) {
  // Get state from store
  const formTitle = useFormBuilderStore((state) => state.formTitle);
  const viewport = useFormBuilderStore((state) => state.viewport);
  const showJson = useFormBuilderStore((state) => state.showJson);
  const selectedComponent = useFormBuilderStore((state) => state.selectedComponent);
  const components = useFormBuilderStore((state) => state.components);
  const { userForms, isLoading } = useSavedForms();

  // Get actions from store
  const { updateComponents, updateFormTitle, updateMode, updateFormId, updateViewport, toggleJsonPreview, duplicateComponent, clearForm, clearHistory  } =
    useFormBuilderStore();

  // Get save form hook
  const { saveCurrentForm, isSaving, canSave } = useSaveForm();

  // Get history hook
  const { undo, redo, canUndo, canRedo } = useHistory();

  // Save form handlers


  const handleLoadRecentForm = async (form: any) => {
    try {
      // Convert stored component data back to FormComponentModel instances
      const components = form.components.map((componentData: any) => {
        return new FormComponentModel(componentData);
      });

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

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInHours < 168) {
      // 7 days
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  // Get the 5 most recent forms
  const recentForms = userForms.slice(0, 5);

  // Duplicate component handler
  const handleDuplicate = () => {
    if (selectedComponent) {
      duplicateComponent(selectedComponent.id);
      toast.success("Component duplicated successfully!");
    }
  };



  // Only render if in editor or preview mode
  if (mode !== "editor" && mode !== "preview") {
    return null;
  }

  return (
    <Menubar className="border-none p-0 shadow-none bg-sidebar">
      <MenubarMenu>
        <MenubarTrigger className="gap-2">File</MenubarTrigger>
        <MenubarContent align="start" className="w-48">
          <LoadFormDialog>
            <MenubarItem onSelect={(e) => e.preventDefault()}>
              <FolderOpen className="h-4 w-4" />
              Open
            </MenubarItem>
          </LoadFormDialog>
          <LoadTemplateDialog>
            <MenubarItem onSelect={(e) => e.preventDefault()}>
              <FolderOpen className="h-4 w-4" />
              Open Template
            </MenubarItem>
          </LoadTemplateDialog>
          <MenubarSub>
            <MenubarSubTrigger>
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              Recent
            </MenubarSubTrigger>
            <MenubarSubContent>
              { isLoading ? (
                <MenubarItem disabled>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </MenubarItem>
              ) : recentForms.length === 0 ? (
                <MenubarItem disabled>No recent forms</MenubarItem>
              ) : (
                recentForms.map((form, index) => (
                <div key={form._id}>
                  <MenubarItem onClick={() => handleLoadRecentForm(form)}>
                    <FileText className="h-4 w-4" />
                    <span className="truncate max-w-[200px] flex-1 mr-4">
                      {form.title}
                    </span>
                    <small className="text-xs text-muted-foreground self-end">
                      {formatDate(form.createdAt)}
                    </small>
                  </MenubarItem>
                </div>
              )))}
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <SaveFormDialog>
            <MenubarItem onSelect={(e) => e.preventDefault()} disabled={isSaving || !canSave}>
              <Save className="h-4 w-4" />
              Save
            </MenubarItem>
          </SaveFormDialog>

          <SaveFormDialog forceSave>
            <MenubarItem onSelect={(e) => e.preventDefault()} disabled={isSaving || !canSave}>
              <Save className="h-4 w-4" />
              Save As
            </MenubarItem>
          </SaveFormDialog>
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
      <MenubarMenu>
        <MenubarTrigger className="gap-2">Edit</MenubarTrigger>
        <MenubarContent align="start" className="w-48">
          <MenubarItem 
            onClick={undo}
            disabled={!canUndo}
          >
            <Undo className="h-4 w-4" />
            Undo
          </MenubarItem>
          <MenubarItem 
            onClick={redo}
            disabled={!canRedo}
          >
            <Redo className="h-4 w-4" />
            Redo
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem 
            onClick={handleDuplicate}
            disabled={!selectedComponent}
          >
            <Copy className="h-4 w-4" />
            Duplicate
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem 
            onClick={clearForm}
            disabled={components.length === 0}
          >
            <Trash2 className="h-4 w-4" />
            Clear Form
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="gap-2">View</MenubarTrigger>
        <MenubarContent align="start" className="w-48">
          <MenubarItem 
            onClick={() => updateViewport('sm')}
            className={viewport === 'sm' ? 'bg-accent' : ''}
          >
            <Smartphone className="h-4 w-4" />
            Mobile
            {viewport === 'sm' && <span className="ml-auto text-xs">✓</span>}
          </MenubarItem>
          <MenubarItem 
            onClick={() => updateViewport('md')}
            className={viewport === 'md' ? 'bg-accent' : ''}
          >
            <Tablet className="h-4 w-4" />
            Tablet
            {viewport === 'md' && <span className="ml-auto text-xs">✓</span>}
          </MenubarItem>
          <MenubarItem 
            onClick={() => updateViewport('lg')}
            className={viewport === 'lg' ? 'bg-accent' : ''}
          >
            <Monitor className="h-4 w-4" />
            Desktop
            {viewport === 'lg' && <span className="ml-auto text-xs">✓</span>}
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => updateMode("editor-preview")} disabled={!components.length}>
            <Play className="h-4 w-4" />
            Live Preview
          </MenubarItem>
          <MenubarItem onClick={() => updateMode("export")} disabled={!components.length}>
            <Code className="h-4 w-4" />
            Generated Code
          </MenubarItem>
          <MenubarItem 
            onClick={toggleJsonPreview}
            className={showJson ? 'bg-accent' : ''}
            disabled={!components.length}
          >
            <Braces className="h-4 w-4" />
            Form JSON
            {showJson && <span className="ml-auto text-xs">✓</span>}
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="gap-2">Help</MenubarTrigger>
        <MenubarContent align="start" className="w-48">
          <MenubarItem onClick={() => window.open('/faq', '_blank')}>
            <BookOpen className="h-4 w-4" />
            FAQ
          </MenubarItem>
          <MenubarItem onClick={() => window.open('https://github.com/iduspara/shadcn-builder/issues/new', '_blank')}>
            <Bug className="h-4 w-4" />
            Bug Report
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => window.open('/about', '_blank')}>
            <Info className="h-4 w-4" />
            About
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
