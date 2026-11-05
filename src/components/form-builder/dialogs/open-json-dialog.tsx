"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { useState } from "react";
import { FormComponentModel } from "@/models/FormComponent";

export function OpenJsonDialog() {
  const [open, setOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const updateComponents = useFormBuilderStore((state) => state.updateComponents);

  const handleSubmit = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      
      // Validate the structure
      if (!Array.isArray(parsedJson)) {
        throw new Error("JSON must be an array of rows");
      }

      // Convert the parsed JSON into FormRow objects
      const components: FormComponentModel[] = parsedJson.map((comp: any) => new FormComponentModel(comp));

      updateComponents(components);
      setOpen(false);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON format");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>
        Load JSON
      </DialogTrigger>
      <DialogContent className="w-full lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Open Form JSON</DialogTitle>
          <DialogDescription>
            Paste your form JSON code here. The JSON should be an array of rows with components.
          </DialogDescription>
        </DialogHeader>
        <div className="h-[500px] w-full overflow-y-auto flex flex-col gap-4">
          <Textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Paste your JSON here..."
            className="h-full font-mono text-sm bg-primary text-white"
          />
          {error && (
            <div className="text-sm text-red-500">
              {error}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} variant="outline">Load JSON</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 
