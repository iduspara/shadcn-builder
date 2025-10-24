import Header from "@/components/landingpage/header";
import Footer from "@/components/landingpage/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export type ChangelogEntry = {
  version: string;
  date: string;
  title: string;
  description: string;
  items?: string[];
  image?: string;
  button?: {
    url: string;
    text: string;
  };
};

const changelogEntries: ChangelogEntry[] = [
  {
    version: "Version 1.0.0",
    date: "24 October 2025",
    title: "Initial Release - Form Builder Platform",
    description: "We're excited to announce the launch of our comprehensive form builder platform. This initial release includes all the core features needed to create beautiful, responsive forms with drag-and-drop simplicity.",
    items: [
      "Drag-and-drop form builder with intuitive interface",
      "Comprehensive form component library (inputs, selects, checkboxes, etc.)",
      "WYSIWYG text editor with rich formatting options",
      "Icon picker with extensive icon library",
      "Form validation system with real-time feedback",
      "Template system with pre-designed form templates",
      "User authentication and form management",
      "Code generation for React components",
      "Responsive design with container queries",
      "JSON import/export functionality",
      "Form examples and best practices",
      "Mobile-optimized interface"
    ],
    button: {
      url: "/builder",
      text: "Try the Builder"
    }
  }
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <section className="py-32">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
                Changelog
              </h1>
              <p className="text-muted-foreground mb-6 text-base md:text-lg">
                Get the latest updates and improvements to our platform.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-3xl space-y-16 md:mt-24 md:space-y-24">
              {changelogEntries.map((entry, index) => (
                <div
                  key={index}
                  className="relative flex flex-col gap-4 md:flex-row md:gap-16"
                >
                  <div className="top-8 flex h-min w-64 shrink-0 items-center gap-4 md:sticky">
                    <Badge variant="secondary" className="text-xs">
                      {entry.version}
                    </Badge>
                    <span className="text-muted-foreground text-xs font-medium">
                      {entry.date}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-foreground/90 mb-3 text-lg font-bold leading-tight md:text-2xl">
                      {entry.title}
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base">
                      {entry.description}
                    </p>
                    {entry.items && entry.items.length > 0 && (
                      <ul className="text-muted-foreground ml-4 mt-4 space-y-1.5 text-sm md:text-base">
                        {entry.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="list-disc">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    {entry.image && (
                      <Image
                        src={entry.image}
                        alt={`${entry.version} visual`}
                        width={800}
                        height={400}
                        className="mt-8 w-full rounded-lg object-cover"
                      />
                    )}
                    {entry.button && (
                      <Button variant="link" className="mt-4 self-end" asChild>
                        <a href={entry.button.url}>
                          {entry.button.text} <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
