"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Loader2,
  FolderOpen,
  Calendar,
  User,
  Eye,
  FileText,
  FileSearch,
  Folder,
  CornerLeftUp,
} from "lucide-react";
import { useSavedForms } from "@/hooks/use-saved-forms";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { FormComponentModel } from "@/models/FormComponent";
import GenerateCanvasGrid from "@/components/form-builder/canvas/generate-canvas-grid";
import { cn } from "@/lib/utils";
import { useLoadTemplates } from "@/hooks/useLoadTemplates";

interface LoadTemplateDialogProps {
  children: React.ReactNode;
}

export function LoadTemplateDialog({ children }: LoadTemplateDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState<any>(null);
  const { updateComponents, updateFormTitle, updateMode, updateFormId, clearHistory } =
    useFormBuilderStore();

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const {
    allTemplates,
    isLoading: isLoadingTemplates,
    error: loadError,
    retry,
    categoriesLoaded,
    totalTemplates,
  } = useLoadTemplates();

  const handleSelectForm = (form: any) => {
    setSelectedForm(form);
    updateMode("preview");
  };

  const handleLoadForm = async () => {
    if (!selectedForm) return;

    try {
      // Convert stored component data back to FormComponentModel instances
      const components = selectedForm.components.map((componentData: any) => {
        return new FormComponentModel(componentData);
      });

      clearHistory();
      updateFormId(selectedForm._id);
      updateFormTitle(selectedForm.formTitle);
      updateMode("editor");
      updateComponents(components);
      setOpen(false);
      setSelectedForm(null);
    } catch (error) {
      console.error("Error loading form:", error);
      alert("Failed to load form. Please try again.");
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedForm(null);
    updateMode("editor");
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const handleDialogStateChange = (state: boolean) => {
    setOpen(state);
    if (!state) {
      handleCancel();
    }
  };

  // Convert selected form components to FormComponentModel instances for preview
  const previewComponents = selectedForm
    ? selectedForm.components.map(
        (componentData: any) => new FormComponentModel(componentData)
      )
    : [];

  return (
    <Dialog open={open} onOpenChange={handleDialogStateChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="lg:max-w-4xl p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b grow-0 self-start">
          <DialogTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" strokeWidth={1.5} />
            Open Template
          </DialogTitle>
        </DialogHeader>

        <div
          className={cn(
            "grid gap-0 flex-1",
            selectedCategory && "grid-cols-2"
          )}
        >
          {/* Left Panel - Form List */}
          <ScrollArea
            className={cn(
              "flex-1 ",
              totalTemplates !== 0 && "border-r h-[478px]"
            )}
          >
            {isLoadingTemplates ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2">Loading templates...</span>
              </div>
            ) : totalTemplates === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No templates found.</p>
              </div>
            ) : !selectedCategory ? (
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-6">Category</TableHead>
                    <TableHead className="pr-6 text-right">
                      Total Templates
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categoriesLoaded.map((category, index) => (
                    <TableRow
                      key={index}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedCategory(category)}
                    >
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-2">
                          <Folder className="h-4 w-4" strokeWidth={1} />
                          <span className="capitalize">
                            {category.replace("-", " ")}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="pr-6 text-right">
                        <small className="text-xs text-muted-foreground">
                          {allTemplates[category].length}
                        </small>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-6">Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                <TableRow
                      key={0}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => {setSelectedCategory(""); setSelectedForm(null)}}
                    >
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-2">
                          <CornerLeftUp className="h-4 w-4" strokeWidth={1} />
                          …
                        </div>
                      </TableCell>
                    </TableRow>
                  {allTemplates[selectedCategory].map((template, index) => (
                    <TableRow
                      key={index + 1}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSelectForm(template)}
                    >
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" strokeWidth={1} />
                          {template.formTitle}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </ScrollArea>

          {/* Right Panel - Preview */}
          {selectedCategory && (
            <div className="p-4 relative bg-dotted overflow-hidden h-[478px] ">
              {selectedForm ? (
                <>
                  <div className="border rounded-lg p-4 bg-background">
                    <GenerateCanvasGrid components={previewComponents} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-muted to-transparent pointer-events-none" />
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <FileSearch className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Select a template from the list to preview it</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="px-6 py-4 border-t sm:justify-between">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleLoadForm} disabled={!selectedForm}>
            Open Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
