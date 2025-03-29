"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pre } from "@/components/ui/pre";
import { Download, Copy, Check } from "lucide-react";
import { useEffect, useState } from "react";
import * as prettier from "prettier/standalone";
import * as parserTypescript from "prettier/parser-typescript";
import { DependenciesImports } from "../helpers/generate-react-code";
import * as prettierPluginEstree from "prettier/plugins/estree";
import { useFormBuilderStore } from "@/stores/form-builder-store";

interface GenerateCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  generatedCode: { code: string; dependenciesImports: DependenciesImports };
}

const getShadcnInstallInstructions = (
  dependencies: DependenciesImports
): string => {
  const shadcnComponents = Object.keys(dependencies)
    .filter((key) => key.startsWith("@/components/ui/"))
    .map((key) => key.split("/").pop() || "");

  if (shadcnComponents.length === 0) return "";

  return `npx shadcn@latest add ${shadcnComponents.join(" ")}`;
};

export function GenerateCodeDialog({
  open,
  onOpenChange,
  generatedCode,
}: GenerateCodeDialogProps) {
  const [formattedCode, setFormattedCode] = useState(generatedCode.code);
  const [copied, setCopied] = useState(false);
  const formTitle = useFormBuilderStore.getState().formTitle.replace(/\s+/g, "");

  useEffect(() => {
    prettier
      .format(generatedCode.code, {
        parser: "typescript",
        plugins: [parserTypescript, prettierPluginEstree],
        semi: true,
        singleQuote: false,
      })
      .then(setFormattedCode);
  }, [generatedCode.code]);

  const handleDownload = () => {
    const blob = new Blob([formattedCode], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formTitle}.tsx`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const installationInstructions = getShadcnInstallInstructions(
    generatedCode.dependenciesImports
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Generated Form Code</DialogTitle>
        </DialogHeader>
        <div>
          <h2 className="text-lg font-semibold mb-0">
            1. Required shadcn/ui components:
          </h2>
          <h3 className="text-sm text-muted-foreground">
            Run the following commands to add the required components:
          </h3>
        </div>
        <div className="relative overflow-x-auto rounded-md">
          <Pre language="bash" code={installationInstructions} />
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 text-muted-foreground"
            onClick={() => handleCopy(installationInstructions)}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-0">2. React Code</h2>
          <h3 className="text-sm text-muted-foreground">
            Copy and paste the following code into your project or <a href="#" onClick={handleDownload} className="underline font-bold">download the file</a>.
          </h3>
        </div>
        <div className="relative overflow-auto rounded-md">
          <Pre language="typescript" code={formattedCode} />
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 text-muted-foreground"
            onClick={() => handleCopy(formattedCode)}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-0">3. Usage</h2>
          <h3 className="text-sm text-muted-foreground">
            Import the form component and use it in your project.
          </h3>
        </div>
        <div className="relative overflow-auto rounded-md">
          <Pre
            language="typescript"
            code={`import ${formTitle} from "./${formTitle}";
<${formTitle} />`}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
