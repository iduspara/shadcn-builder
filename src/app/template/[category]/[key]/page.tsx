"use client";

import { use, useEffect, useMemo, useState } from "react";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import GenerateCanvasGrid from "@/components/form-builder/canvas/generate-canvas-grid";
import { ToggleGroupNav } from "@/components/form-builder/ui/toggle-group-nav";
import {
  ArrowRight,
  Check,
  Copy,
  Grid,
  Link,
  Monitor,
  Smartphone,
  Tablet,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Header from "@/components/landingpage/header";
import Footer from "@/components/landingpage/footer";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { useLoadTemplates } from "@/hooks/useLoadTemplates";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [copied, setCopied] = useState(false);
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

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const {
    allTemplates,
    isLoading,
    error: loadError,
    retry,
    totalTemplates,
    categoriesLoaded,
  } = useLoadTemplates();

  return (
    <div>
      <Header />
      <Breadcrumb className="max-w-8xl mx-auto mt-16 md:mt-18 mb-4 px-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/template/business/job_application">
              Templates
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{loadedTemplate?.formTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="max-w-8xl mx-auto px-4 space-y-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Templates</h1>
          <p className="text-xl text-muted-foreground">
            Checkout our 100+ form templates organized by category, built with
            shadcn/ui builder.
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <span>
              <strong>{totalTemplates}</strong> total templates
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Grid className="h-4 w-4 text-primary" />
            <span>
              <strong>{categoriesLoaded.length}</strong> form categories
            </span>
          </div>
        </div>
        <Separator className="my-8" />
      </div>

      <main className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 mb-24 px-4">
        <div className="md:col-span-2">
          <div className="flex flex-col gap-2">
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <span className="text-muted-foreground">
                  Loading templates...
                </span>
              </div>
            ) : loadError ? (
              <div className="flex flex-col gap-2">
                <span className="text-destructive">
                  Error loading templates.
                </span>
                <button
                  className="underline text-foreground text-left"
                  onClick={retry}
                >
                  Retry
                </button>
              </div>
            ) : (
              <>
                <h2 className="ext-lg font-semibold mb-1 md:hidden">Select a template</h2>
                <Select
                  value={`${category}/${key}`}
                  onValueChange={(value) => {
                    const [cat, templateKey] = value.split("/");
                    window.location.href = `/template/${cat}/${templateKey}`;
                  }}
                >
                  <SelectTrigger className="w-full md:hidden">
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(allTemplates)
                      .sort()
                      .map(([categoryName, templates]) => (
                        <SelectGroup key={categoryName}>
                          <SelectLabel className="capitalize">
                            {categoryName.replace(/-/g, " ")}
                          </SelectLabel>
                          {templates.map((template) => (
                            <SelectItem
                              key={template.formId}
                              value={`${categoryName}/${template.formId}`}
                            >
                              {template.formTitle}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                  </SelectContent>
                </Select>
                {Object.entries(allTemplates)
                  .sort()
                  .map(([categoryName, templates]) => (
                    <div key={categoryName} className="hidden md:block">
                      <h2 className="text-lg font-semibold mb-1 capitalize">
                        {categoryName.replace(/-/g, " ")}
                      </h2>
                      <ul className="mb-2 ml-2">
                        {templates.map((template) => (
                          <li
                            key={template.formId}
                            className={cn(
                              "pl-2 py-1 hover:bg-accent rounded transition group",
                              template.formTitle === loadedTemplate?.formTitle
                                ? "bg-accent"
                                : ""
                            )}
                          >
                            <a
                              href={`/template/${categoryName}/${template.formId}`}
                              className="text-sm font-medium group-hover:underline group-hover:text-primary transition"
                            >
                              {template.formTitle}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full md:col-span-10 gap-4">
          <div className="">
            <h1 className="text-2xl font-bold mb-2">
              {loadedTemplate?.formTitle}
            </h1>
            <p className="text-sm mb-2">Form description:</p>
            <p className="text-sm text-muted-foreground mb-4">
              {loadedTemplate?.formDescription}
            </p>
          </div>
          <Tabs defaultValue="preview" className="">
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
              Start building your form now with our interactive form builder.
              Drag, drop, and customize to create the perfect form for your
              needs.
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
      </main>
      <Footer />
    </div>
  );
}
