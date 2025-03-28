"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { generateFormCode } from "../helpers/generate-react-code";
import { FormRow } from "../types";
import { useState } from "react";

interface GenerateCodeDialogProps {
  rows: FormRow[];
}

export function GenerateCodeDialog({ rows }: GenerateCodeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateCode = async () => {
    setIsLoading(true);
    try {
      const generatedCode = await generateFormCode(rows);
      setCode(generatedCode);
    } catch (error) {
      console.error("Error generating code:", error);
      setCode("Error generating code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Generate Code</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Generated React Code</DialogTitle>
          <DialogDescription>
            Here's the generated React code for your form. You can copy it and use it in your project.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full w-full rounded-md border p-4">
            <pre className="text-sm">
              <code>{isLoading ? "Generating code..." : code}</code>
            </pre>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
