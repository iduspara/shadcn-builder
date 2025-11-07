"use client";

import { useEffect, useMemo, useState, use } from "react";
import GenerateCanvasGrid from "@/components/form-builder/canvas/generate-canvas-grid";
import { ToggleGroupNav } from "@/components/form-builder/ui/toggle-group-nav";
import { Button, buttonVariants } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";
import { Pre } from "@/components/ui/pre";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";
import { generateFormCode } from "@/components/form-builder/helpers/generate-react-code";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import {
  ArrowRight,
  Check,
  Copy,
  Loader2,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";
import { useLoadTemplates } from "@/hooks/useLoadTemplates";
import { Skeleton } from "@/components/ui/skeleton";

const viewportEditorStyles = {
  sm: "w-[370px]",
  md: "w-[818px]",
  lg: "w-[1074px]",
} as const;

export default function TemplatePage({
  params,
}: {
  params: Promise<{ category: string; key: string }>;
}) {
  const viewportItems = useMemo(
    () => [
      { value: "lg", icon: Monitor },
      { value: "md", icon: Tablet },
      { value: "sm", icon: Smartphone },
    ],
    []
  );

  const updateViewport = useFormBuilderStore((state) => state.updateViewport);
  const viewport = useFormBuilderStore((state) => state.viewport);
  const components = useFormBuilderStore((state) => state.components);
  const { category, key } = use(params);
  const loadTemplate = useFormBuilderStore((state) => state.loadTemplate);
  const loadedTemplate = useFormBuilderStore((state) => state.loadedTemplate);
  const updateMode = useFormBuilderStore((state) => state.updateMode);
  const { isLoading, error: loadError } = useLoadTemplates();
  const [formattedCode, setFormattedCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const template = category;
    const templateKey = key;

    loadTemplate(template, templateKey || undefined)
      .then((success) => {
        if (success) {
          console.log(
            `Template loaded successfully: ${template}${templateKey ? ` (${templateKey})` : ""}`
          );
          updateMode("editor-preview");
        } else {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.error("Error loading template:", error);
        window.location.href = "/";
      });
  }, [loadTemplate, category, key, updateMode]);

  useEffect(() => {
    const generateCode = async () => {
      if (!components || components.length === 0) {
        setFormattedCode("");
        return;
      }
      const code = await generateFormCode(components);
      setFormattedCode(code.code);
    };
    generateCode();
  }, [components]);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeTemplate = loadedTemplate;

  if (isLoading) {
    return (
      <div className="flex flex-col w-full md:col-span-10 gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-48" />
        </div>
        <div className="flex justify-between mt-4">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-46" />
        </div>
        <Skeleton className="w-full h-[700px]" />

      </div>
    );
  }

  if (loadError) {
    return <div>Error: {loadError}</div>;
  }

  return (
    <div className="flex flex-col w-full md:col-span-10 gap-4">
      <div>
        <h1 className="text-2xl font-bold mb-2">{activeTemplate?.formTitle}</h1>
        <p className="text-sm mb-2">Form description:</p>
        <p className="text-sm text-muted-foreground mb-4">
          {activeTemplate?.formDescription}
        </p>
      </div>
      <Tabs defaultValue="preview">
        <div className="flex flex-row justify-between gap-2 mb-2">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <a
            href={`/builder?template=${category}&key=${key}`}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Edit form in builder
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <TabsContent value="preview">
          <div className="bg-dotted w-full rounded-lg border px-4 pb-4 md:px-10 md:pb-10 overflow-hidden">
            <ToggleGroupNav
              name="viewport"
              items={viewportItems}
              defaultValue={viewport}
              onValueChange={(value) =>
                updateViewport(value as "sm" | "md" | "lg")
              }
              className="mx-auto my-4 shadow"
            />
            <Card
              className={cn(
                "transition-all duration-300",
                `${viewportEditorStyles[viewport]}`,
                "mx-auto scrollbar-hide"
              )}
            >
              <CardContent>
                <GenerateCanvasGrid components={components} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="p-0 w-full overflow-y-auto rounded-lg border">
            {components && components.length > 0 ? (
              <div className="relative">
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
                <Pre
                  language="tsx"
                  code={formattedCode}
                  className="rounded-none"
                />
              </div>
            ) : null}
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-dotted border rounded-lg p-8 text-center space-y-4 mt-12">
        <h3 className="text-2xl font-semibold">Ready to start building?</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Start building your form now with our interactive form builder. Drag,
          drop, and customize to create the perfect form for your needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <a href="/builder">
              Start Building <ArrowRight className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
