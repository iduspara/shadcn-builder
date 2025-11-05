"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  FileText,
  Palette,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserThemes, useSetDefaultTheme, useUnsetDefaultTheme, useDeleteTheme, useApplyTheme } from "@/hooks/use-themes";
import { Checkbox } from "@/components/ui/checkbox";
import { Doc } from "../../../../convex/_generated/dataModel";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { Badge } from "@/components/ui/badge";

interface ManageThemesDialogProps {
  children: React.ReactNode;
}

type Theme = Doc<"userThemes">;

export function ManageThemesDialog({ children }: ManageThemesDialogProps) {
  const [open, setOpen] = useState(false);
  const { themes, isLoading: isLoadingThemes } = useUserThemes();
  const { applyTheme } = useApplyTheme();

  const deleteTheme = useDeleteTheme();

const currentTheme = useFormBuilderStore((state) => state.currentTheme);

  const handleDeleteTheme = async (theme: Theme) => {
    try {
      await deleteTheme(theme._id);
      if (theme.isDefault) {
        toast.success(`${theme.name} deleted successfully. It is no longer the default theme.`);
      } else {
        toast.success(`${theme.name} deleted successfully`);
      }
    } catch (err) {
      console.error("Error deleting theme:", err);
      toast.error("Failed to delete theme. Please try again.");
    }
  };

  const handleCancel = () => {
    setOpen(false);
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

  const handleApplyTheme = (theme: Theme) => {
    applyTheme(theme.css);
    toast.success(`${theme.name} applied to canvas`);
  };  

  return (
    <Dialog open={open} onOpenChange={handleDialogStateChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="lg:max-w-4xl p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b grow-0 self-start">
          <DialogTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" strokeWidth={1.5} />
            Manage Themes
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className={cn("flex-1 ", themes.length !== 0  && "border-r h-[478px]")}>
            {isLoadingThemes ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2">Loading themes...</span>
              </div>
            ) : themes.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No themes found.</p>
                <p className="text-sm">
                  Create and save a theme to see it here.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-6">Name</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {themes.map((theme) => (
                    <TableRow
                      key={theme._id}
                      className="hover:bg-muted/50"
                      
                    >
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-2 cursor-pointer hover:underline" onClick={() => handleApplyTheme(theme)}>
                          {theme.name}
                          {currentTheme === theme.css && (
                            <Badge variant="outline" className="text-xs">Active</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(theme.createdAt)}
                      </TableCell>
                      <TableCell>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Theme</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete &quot;{theme.name}&quot;? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteTheme(theme)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </ScrollArea>
          <DialogFooter className="px-6 py-4 border-t justify-between">
        <Button onClick={handleCancel}>Close</Button>
      </DialogFooter>
      </DialogContent>

    </Dialog>
  );
}
