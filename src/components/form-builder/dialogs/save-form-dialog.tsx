"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
  Calendar,
  User,
  Eye,
  FileText,
  FileSearch,
  Save,
} from "lucide-react";
import { useSavedForms } from "@/hooks/use-saved-forms";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { FormComponentModel } from "@/models/FormComponent";
import GenerateCanvasGrid from "@/components/form-builder/canvas/generate-canvas-grid";
import { cn } from "@/lib/utils";
import { formatDate, DialogListLoading, DialogListEmpty } from "./dialog-list-states";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSaveForm } from "@/hooks/use-save-form";
import { toast } from "sonner";

interface SaveFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  forceSave?: boolean;
}

export function SaveFormDialog({ open, onOpenChange: setOpen, forceSave }: SaveFormDialogProps) {
  const [selectedForm, setSelectedForm] = useState<any>(null);
  const { userForms, isLoading } = useSavedForms();
  const { updateComponents, updateFormTitle, updateMode, updateFormId, formTitle, formId } =
    useFormBuilderStore();
  const { saveCurrentForm, isSaving, canSave } = useSaveForm();

  const handleSelectForm = (form: any) => {
    setSelectedForm(form);
    updateMode("preview");
  };

  const handleSaveForm = async () => {
    try {
      const formId = await saveCurrentForm({ forceNew: forceSave });
      updateFormId(formId);
      toast.success("Form saved successfully!");
      setOpen(false);
    } catch (error) {
      console.error("Error saving form:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save form. Please try again."
      );
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };


  // Convert selected form components to FormComponentModel instances for preview
  const previewComponents = selectedForm
    ? selectedForm.components.map(
        (componentData: any) => new FormComponentModel(componentData)
      )
    : [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="lg:max-w-4xl p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b grow-0 self-start">
          <DialogTitle className="flex items-center gap-2">
            <Save className="h-5 w-5" strokeWidth={1.5} />
            Save
          </DialogTitle>
        </DialogHeader>

        <div className={cn("grid gap-0 flex-1", userForms.length !== 0  && "grid-cols-2")}>
          {/* Left Panel - Form List */}
          <ScrollArea className={cn("flex-1 ", userForms.length !== 0  && "border-r h-[478px]")}>
            {isLoading ? (
              <DialogListLoading label="Loading saved forms..." />
            ) : userForms.length === 0 ? (
              <DialogListEmpty title="No saved forms found." hint="Create and save a form to see it here." />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-6">Name</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userForms.map((form) => (
                    <TableRow
                      key={form._id}
                      onClick={() => handleSelectForm(form)}
                      className="cursor-pointer hover:bg-muted/50"
                    >
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" strokeWidth={1} />
                          {form.title}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(form.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </ScrollArea>

          {/* Right Panel - Preview */}
          {userForms.length !== 0 && (
          <div className="p-4 relative bg-dotted overflow-hidden h-[478px] ">
            {selectedForm ? (
              <>
                <div className="border rounded-lg p-4 bg-background">
                  <GenerateCanvasGrid components={previewComponents} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-muted dark:from-black to-transparent pointer-events-none" />
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <FileSearch className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a form from the list to preview it</p>
                </div>
              </div>
            )}
          </div>
          )}
        </div>

        <div className="px-6 py-4 border-t flex flex-row items-center gap-2">
        <Label>Name</Label>

        <Input
                  placeholder="Enter a name for the form"
                  value={formTitle}
                  onChange={(e) => updateFormTitle(e.target.value)}
                />
        </div>


        <DialogFooter className="px-6 py-4 border-t sm:justify-between">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSaveForm} disabled={!formTitle}>
            <Save className="h-4 w-4" />
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
