"use client";

import { use, useEffect, useMemo, useState } from "react";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import GenerateCanvasGrid from "@/components/form-builder/canvas/generate-canvas-grid";
import { ToggleGroupNav } from "@/components/form-builder/ui/toggle-group-nav";
import { ArrowRight, Monitor, Smartphone, Tablet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Header from "@/components/landingpage/header";
import Footer from "@/components/landingpage/footer";
import { buttonVariants } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { generateFormCode } from "@/components/form-builder/helpers/generate-react-code";
import { Pre } from "@/components/ui/pre";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const viewportEditorStyles = {
  sm: "w-[370px]",
  md: "w-[818px]",
  lg: "w-[1074px]",
} as const;

export default function PreviewPage({
  params,
}: {
  params: Promise<{ category: string; key: string }>;
}) {
  // Memoize static values
  const viewportItems = useMemo(
    () => [
      { value: "lg", icon: Monitor },
      { value: "md", icon: Tablet },
      { value: "sm", icon: Smartphone },
    ],
    []
  );

  const loadTemplate = useFormBuilderStore((state) => state.loadTemplate);
  const loadedTemplate = useFormBuilderStore((state) => state.loadedTemplate);
  const updateMode = useFormBuilderStore((state) => state.updateMode);
  const updateViewport = useFormBuilderStore((state) => state.updateViewport);
  const viewport = useFormBuilderStore((state) => state.viewport);
  const components = useFormBuilderStore((state) => state.components);
  const [formattedCode, setFormattedCode] = useState("");
  const { category, key } = use(params);
  // Store the components types used in the form
  const componentsTypesUsedInForm = useMemo(() => {
    return components.map((component) => component.type);
  }, [components]);

  useEffect(() => {
    const generateCode = async () => {
      const code = await generateFormCode(components);
      setFormattedCode(code.code);
    };
    generateCode();
  }, [components]);

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

  return (
    <div>
      <Header />
      <Breadcrumb className="container max-w-7xl mx-auto mt-16 md:mt-24 mb-4 px-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/templates">Templates</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{loadedTemplate?.formTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <main className="container max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-start mb-24 px-4">
        <div className="flex flex-col md:max-w-3/4 w-full">
          <Tabs defaultValue="preview" className="">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <div className="bg-dotted w-full max-h-[700px] overflow-y-auto rounded-lg border px-4 pb-4 md:px-10 md:pb-10">
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
            <div className="p-0 w-full max-h-[700px] overflow-y-auto rounded-lg border">
                  {components && components.length > 0 ? (
                    <Pre
                      language="tsx"
                      code={formattedCode}
                      className="rounded-none"
                    />
                  ) : null}
                </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="md:w-1/4 border rounded-lg p-4 md:mt-11">
          <h1 className="text-2xl font-bold mb-2">
            {loadedTemplate?.formTitle}
          </h1>
          <p className="text-sm mb-2">Form description:</p>
          <p className="text-sm text-muted-foreground mb-4">
            {loadedTemplate?.formDescription}
          </p>
          <p className="text-sm  mb-2">Form Components:</p>
          <div className="flex flex-wrap gap-1">
            {componentsTypesUsedInForm.map((component, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="rounded-full text-xs"
              >
                {component}
              </Badge>
            ))}
          </div>
          <p className="text-sm mb-2 mt-4">Tags:</p>
          {loadedTemplate?.tags && loadedTemplate?.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {loadedTemplate?.tags.slice(0, 3).map((tag: string) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="rounded-full text-xs"
                >
                  {tag}
                </Badge>
              ))}
              {loadedTemplate?.tags.length > 3 && (
                <Badge variant="outline" className="rounded-full text-xs">
                  +{loadedTemplate?.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
          <Separator className="my-4" />
          <a
            href={`/builder?template=${category}&key=${key}`}
            className={cn(buttonVariants({ variant: "default" }), "w-full")}
          >
            Edit form in builder
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
