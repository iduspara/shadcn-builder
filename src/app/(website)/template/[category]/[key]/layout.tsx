import { notFound } from "next/navigation";

import {
  getTemplateDefinition,
  getTemplatesCatalog,
} from "@/lib/templates/server";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Footer from "@/components/landingpage/footer";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
interface TemplatePageParams {
  category: string;
  key: string;
}
import Link from "next/link";
import { Zap } from "lucide-react";
import { Grid } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function PreviewPage({
  params,
  children,
}: {
  params: Promise<TemplatePageParams>;
  children: React.ReactNode;
}) {
  const { category, key } = await params;

  const [template, catalogSummary] = await Promise.all([
    getTemplateDefinition(category, key),
    getTemplatesCatalog(),
  ]);

  if (!template) {
    notFound();
  }

  return (
    <div className="max-w-8xl mx-auto px-4">
      <Breadcrumb className="mb-4">
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
            <BreadcrumbPage>{template.formTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Templates</h1>
          <p className="text-xl text-muted-foreground">
            Checkout our 100+ form templates organized by category, built with
            shadcn/ui builder.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <span>
              <strong>{catalogSummary.totalTemplates}</strong> total templates
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Grid className="h-4 w-4 text-primary" />
            <span>
              <strong>{catalogSummary.categoriesLoaded.length}</strong> form
              categories
            </span>
          </div>
        </div>
        <Separator className="my-8" />
      </div>

      <main className=" grid grid-cols-1 md:grid-cols-12 gap-6 mb-24">
        <div className="md:col-span-2">
          <div className="flex flex-col gap-2">
            <h2 className="ext-lg font-semibold mb-1 md:hidden">
              Select a template
            </h2>
            <Select value={`${template.category}/${template.formId}`}>
              <SelectTrigger className="w-full md:hidden">
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(catalogSummary.templatesByCategory)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([categoryName, templates]) => (
                    <SelectGroup key={categoryName}>
                      <SelectLabel className="capitalize">
                        {categoryName.replace(/-/g, " ")}
                      </SelectLabel>
                      {templates.map((candidate) => (
                        <SelectItem
                          key={candidate.formId}
                          value={`${categoryName}/${candidate.formId}`}
                        >
                          <Link
                            href={`/template/${categoryName}/${candidate.formId}`}
                            className="text-sm font-medium group-hover:underline group-hover:text-primary transition"
                          >
                            {candidate.formTitle}
                          </Link>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
              </SelectContent>
            </Select>
            {Object.entries(catalogSummary.templatesByCategory)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([categoryName, templates]) => (
                <div key={categoryName} className="hidden md:block">
                  <h2 className="text-lg font-semibold mb-1 capitalize">
                    {categoryName.replace(/-/g, " ")}
                  </h2>
                  <ul className="mb-2 ml-2">
                    {templates.map((candidate) => (
                      <li
                        key={candidate.formId}
                        className={cn(
                          "pl-2 py-1 hover:bg-accent rounded transition group",
                          candidate.formId === template.formId
                            ? "bg-accent"
                            : ""
                        )}
                      >
                        <Link
                          href={`/template/${categoryName}/${candidate.formId}`}
                          className="text-sm font-medium group-hover:underline group-hover:text-primary transition"
                        >
                          {candidate.formTitle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
