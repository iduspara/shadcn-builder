import Header from "@/components/landingpage/header";
import Footer from "@/components/landingpage/footer";
import type { ComponentProps } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function fetchChangelog(): Promise<string> {
  // Use raw GitHub URL to fetch plain Markdown content
  const res = await fetch(
    "https://raw.githubusercontent.com/iduspara/shadcn-builder/refs/heads/main/CHANGELOG.md",
    { next: { revalidate: 60 } }
  );
  if (!res.ok) {
    return "Failed to load changelog.";
  }
  return res.text();
}

export default async function ChangelogPage() {
  const markdown = await fetchChangelog();
  return (
    <div>
      <Header />
      <main className="max-w-8xl mx-auto px-4 py-16 md:py-18">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <Breadcrumb className="mb-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/changelog">Changelog</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight">
                    Changelog
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <section className="space-y-6">
            <article className="prose">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a(props: ComponentProps<"a">) {
                    return (
                      <a
                        {...props}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:opacity-80"
                      />
                    );
                  },
                }}
              >
                {markdown}
              </ReactMarkdown>
            </article>
          </section>

          <div className="bg-dotted border rounded-lg p-8 text-center space-y-4 mt-12">
            <h3 className="text-2xl font-semibold">Ready to start building?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Take these components for a spin in our interactive form builder. 
              Drag, drop, and customize to create the perfect form for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/builder">
                  Open Form Builder <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/template/business/job_application">
                  Browse Templates
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
