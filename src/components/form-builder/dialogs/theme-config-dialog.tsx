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
import { useUserThemes, useSaveTheme, useDeleteTheme, useApplyTheme } from "@/hooks/use-themes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Id, Doc } from "../../../../convex/_generated/dataModel";

interface ThemeConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const defaultThemeTemplate = ``;

const countMatches = (text: string, pattern: RegExp) => (text.match(pattern) || []).length;

const THEME_CSS_RULES: { error: string; isBroken: (css: string) => boolean }[] = [
  { error: "Theme CSS cannot be empty", isBroken: (css) => !css.trim() },
  { error: "Theme must include :root selector", isBroken: (css) => !css.includes(":root") },
  { error: "Theme must include .dark selector", isBroken: (css) => !css.includes(".dark") },
  // Basic CSS validation - check for balanced braces
  {
    error: "CSS has unbalanced braces",
    isBroken: (css) => countMatches(css, /\{/g) !== countMatches(css, /\}/g),
  },
];

/** First problem with the theme CSS, or null when it looks valid. */
export function getThemeCSSError(css: string): string | null {
  return THEME_CSS_RULES.find((rule) => rule.isBroken(css))?.error ?? null;
}

/** Validation error for the save form: CSS first, then the theme name. */
export function getThemeFormError(css: string, name: string): string | null {
  return getThemeCSSError(css) ?? (name.trim() ? null : "Theme name is required");
}

const getErrorMessage = (err: unknown, fallback: string) =>
  err instanceof Error ? err.message : fallback;

type Theme = Doc<"userThemes">;

export function ThemeConfigDialog({ open, onOpenChange: setOpen }: ThemeConfigDialogProps) {
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [themeName, setThemeName] = useState("");
  const [themeCSS, setThemeCSS] = useState(defaultThemeTemplate);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const saveTheme = useSaveTheme();
  const { applyTheme } = useApplyTheme();


  const resetForm = () => {
    setSelectedTheme(null);
    setThemeName("");
    setThemeCSS(defaultThemeTemplate);
    setIsEditing(false);
  };

  const handleSaveTheme = async () => {
    const formError = getThemeFormError(themeCSS, themeName);
    setError(formError);
    if (formError) return;

    try {
      await saveTheme({
        id: selectedTheme?._id,
        name: themeName.trim(),
        css: themeCSS.trim(),
        isDefault: selectedTheme?.isDefault || false,
      });

      toast.success(selectedTheme ? "Theme updated successfully!" : "Theme saved successfully!");
      resetForm();
      applyTheme(themeCSS.trim());
    } catch (err) {
      console.error("Error saving theme:", err);
      toast.error(getErrorMessage(err, "Failed to save theme. Please try again."));
    }
  };

  const handleApplyTheme = () => {
    const cssError = getThemeCSSError(themeCSS);
    if (cssError) {
      setError(cssError);
      return;
    }

    applyTheme(themeCSS.trim());
    toast.success("Theme applied to canvas!");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

