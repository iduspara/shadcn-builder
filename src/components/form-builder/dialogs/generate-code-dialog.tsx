"use client";

import { Button } from "@/components/ui/button";
import { Pre } from "@/components/ui/pre";
import { Copy, Check } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import * as prettier from "prettier/standalone";
import * as parserTypescript from "prettier/parser-typescript";
import { generateFormCode } from "../helpers/generate-react-code";
import * as prettierPluginEstree from "prettier/plugins/estree";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import type { Plugin } from "prettier";
import { ReactCode } from "@/types/form-builder.types";
import { DependenciesImports } from "../helpers/generate-react-code";

const getShadcnInstallInstructions = (
  dependencies: ReactCode["dependencies"]
): string => {
  const shadcnComponents = Object.keys(dependencies)
    .filter((key) => key.startsWith("@/components/ui/"))
    .map((key) => key.split("/").pop() || "");

  if (shadcnComponents.length === 0) return "";

  return `npx shadcn@latest add ${shadcnComponents.join(" ")}`;
};

const getThirdPartyDependenciesInstallInstructions = (
  thirdPartyDependencies: string[]
): string => {
  console.log(thirdPartyDependencies);
  if (thirdPartyDependencies.length === 0) return "";
  return `yarn add ${thirdPartyDependencies.join(" ")}`;
};

export function MainExport() {
  const components = useFormBuilderStore((state) => state.components);
  const [generatedCode, setGeneratedCode] = useState<{
    code: string;
    dependenciesImports: DependenciesImports;
    thirdPartyDependenciesImports: string[];
  }>({ code: "", dependenciesImports: {}, thirdPartyDependenciesImports: [] });

  useEffect(() => {
    const generateCode = async () => {
      const code = await generateFormCode(components);
      setGeneratedCode(code);
    };
    generateCode();
  }, [components]);

  const [formattedCode, setFormattedCode] = useState(generatedCode.code);
  const [copied, setCopied] = useState(false);
  const formTitle = useFormBuilderStore
    .getState()
    .formTitle.replace(/\s+/g, "");

  useEffect(() => {
    prettier
      .format(generatedCode.code, {
        parser: "typescript",
        plugins: [parserTypescript, prettierPluginEstree as Plugin],
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
    generatedCode.dependenciesImports || {}
  );

  const thirdPartyDependenciesInstallInstructions =
    getThirdPartyDependenciesInstallInstructions(
      generatedCode.thirdPartyDependenciesImports || []
    );

  return (
    <div className="flex flex-col justify-between gap-4 py-4 h-full max-w-4xl mx-auto ">
      <div className="relative">
        <h2 className="text-lg font-semibold mb-0">
          Required shadcn/ui components:
        </h2>
        <h3 className="text-sm text-muted-foreground">
          Run the following commands to add the required components:
        </h3>
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
        <div className="relative overflow-x-auto rounded-md min-h-20 mt-4">
          <Pre language="bash" code={installationInstructions} />
        </div>
      </div>

      {thirdPartyDependenciesInstallInstructions && (
        <div className="relative">
          <h2 className="text-lg font-semibold mb-0">
            Required third party dependencies:
          </h2>
          <h3 className="text-sm text-muted-foreground">
            Run the following commands to add the required third party
            dependencies:
          </h3>
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 text-muted-foreground"
            onClick={() =>
              handleCopy(thirdPartyDependenciesInstallInstructions)
            }
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          <div className="relative overflow-x-auto rounded-md min-h-20 mt-4">
            <Pre
              language="bash"
              code={thirdPartyDependenciesInstallInstructions}
            />
          </div>
        </div>
      )}

      <div className="relative">
        <h2 className="text-lg font-semibold mb-0">React Code</h2>
        <h3 className="text-sm text-muted-foreground">
          Copy and paste the following code into your project or
          <a href="#" onClick={handleDownload} className="underline font-bold">
            download the file
          </a>
          .
        </h3>

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

      <div className="flex-1 overflow-y-auto relative">
        <Pre language="typescript" code={formattedCode} className="" />
      </div>

      <div className="relative">
        <h2 className="text-lg font-semibold mb-0">Usage</h2>
        <h3 className="text-sm text-muted-foreground">
          Import the form component and use it in your project.
        </h3>
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 text-muted-foreground"
          onClick={() =>
            handleCopy(`import ${formTitle} from "./${formTitle}";
<${formTitle} />`)
          }
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
        <div className="relative overflow-auto rounded-md min-h-20 mt-4">
          <Pre
            language="typescript"
            code={`import ${formTitle} from "./${formTitle}";
<${formTitle} />`}
          />
        </div>
      </div>
    </div>
  );
}
