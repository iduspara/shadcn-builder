"use client";

import { useEffect, useState } from "react";
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
  Palette,
  Trash2,
  Save,
  Check,
  Plus,
  Edit,
  X,
  Upload,
} from "lucide-react";
import { useUserThemes, useSaveTheme, useDeleteTheme, useSetDefaultTheme, useApplyTheme } from "@/hooks/use-themes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Id, Doc } from "../../../../convex/_generated/dataModel";

interface ThemeConfigDialogProps {
  children: React.ReactNode;
}

const defaultThemeTemplate = ``;

function validateThemeCSS(css: string): { isValid: boolean; error?: string } {
  if (!css.trim()) {
    return { isValid: false, error: "Theme CSS cannot be empty" };
  }
  
  // Check for required selectors
  if (!css.includes(":root")) {
    return { isValid: false, error: "Theme must include :root selector" };
  }
  
  if (!css.includes(".dark")) {
    return { isValid: false, error: "Theme must include .dark selector" };
  }
  
  // Basic CSS validation - check for balanced braces
  const openBraces = (css.match(/\{/g) || []).length;
  const closeBraces = (css.match(/\}/g) || []).length;
  
  if (openBraces !== closeBraces) {
    return { isValid: false, error: "CSS has unbalanced braces" };
  }
  
  return { isValid: true };
}

type Theme = Doc<"userThemes">;

export function ThemeConfigDialog({ children }: ThemeConfigDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [themeName, setThemeName] = useState("");
  const [themeCSS, setThemeCSS] = useState(defaultThemeTemplate);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const saveTheme = useSaveTheme();
  const { applyTheme } = useApplyTheme();


  const handleSaveTheme = async () => {
    setError(null);
    
    const validation = validateThemeCSS(themeCSS);
    if (!validation.isValid) {
      setError(validation.error || "Invalid theme CSS");
      return;
    }
    
    if (!themeName.trim()) {
      setError("Theme name is required");
      return;
    }
    
    try {
      await saveTheme({
        id: selectedTheme?._id,
        name: themeName.trim(),
        css: themeCSS.trim(),
        isDefault: selectedTheme?.isDefault || false,
      });
      
      toast.success(selectedTheme ? "Theme updated successfully!" : "Theme saved successfully!");
      setSelectedTheme(null);
      setThemeName("");
      setThemeCSS(defaultThemeTemplate);
      setIsEditing(false);
      applyTheme(themeCSS.trim());
    } catch (err) {
      console.error("Error saving theme:", err);
      toast.error(
        err instanceof Error ? err.message : "Failed to save theme. Please try again."
      );
    }
  };


  const handleApplyTheme = () => {
    const validation = validateThemeCSS(themeCSS);
    if (!validation.isValid) {
      setError(validation.error || "Invalid theme CSS");
      return;
    }
    
    applyTheme(themeCSS.trim());
    toast.success("Theme applied to canvas!");
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div>{children}</div>
      </DialogTrigger>
      <DialogContent className="lg:max-w-4xl p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b grow-0 self-start">
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" strokeWidth={1.5} />
            Import Theme configuration
          </DialogTitle>
          <DialogDescription>
            Manage your custom shadcn theme configurations.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col">
            <div className="p-4 border-b">
              <div className="space-y-2">
                <Label>Theme Name</Label>
                <Input
                  placeholder="Enter theme name"
                  value={themeName}
                  onChange={(e) => setThemeName(e.target.value)}
                />
              </div>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-2">
                <Label>CSS Configuration</Label>
                <Textarea
                  value={themeCSS}
                  onChange={(e) => {
                    setThemeCSS(e.target.value);
                    setError(null);
                  }}
                  placeholder="Paste your theme CSS here..."
                  className="h-[400px] font-mono text-sm"
                />
                {error && (
                  <div className="text-sm text-destructive">
                    {error}
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

        <DialogFooter className="px-6 py-4 border-t sm:justify-between">
        <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveTheme}
              disabled={!themeName.trim() || !themeCSS.trim()}
            >
              <Save className="h-4 w-4 mr-2" />
              {selectedTheme ? "Update Theme" : "Save Theme"}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

