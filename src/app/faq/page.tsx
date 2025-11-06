"use client";

import { useState } from "react";
import { 
  ChevronDown, 
  Search, 
  HelpCircle, 
  Code2, 
  Zap, 
  Settings, 
  Shield, 
  Users,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/landingpage/header";
import Footer from "@/components/landingpage/footer";
import { cn } from "@/lib/utils";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "general" | "technical" | "features" | "pricing" | "support";
  tags: string[];
}

const faqData: FAQItem[] = [
  // General Questions
  {
    id: "what-is-builder",
    question: "What is shadcn/ui Builder?",
    answer: "shadcn/ui Builder is a visual form builder that allows you to create beautiful, responsive forms using drag-and-drop functionality. It generates clean React code with TypeScript, uses shadcn/ui components, and includes built-in validation with React Hook Form and Zod.",
    category: "general",
    tags: ["overview", "form builder", "react"]
  },
  {
    id: "who-for",
    question: "Who is this tool designed for?",
    answer: "This tool is perfect for developers who want to speed up form creation, designers who need to prototype quickly, and anyone who wants to build professional forms without writing code from scratch. It's especially useful for React developers familiar with modern web development practices.",
    category: "general",
    tags: ["target audience", "developers", "designers"]
  },
  {
    id: "no-coding-required",
    question: "Do I need to know how to code to use this?",
    answer: "While coding knowledge isn't required to build forms visually, having basic understanding of web development helps. The tool generates React/TypeScript code, so if you want to customize or integrate the generated code, some programming knowledge is beneficial.",
    category: "general",
    tags: ["no-code", "coding", "requirements"]
  },
  {
    id: "browser-support",
    question: "Which browsers are supported?",
    answer: "The builder works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your preferred browser for the best experience.",
    category: "general",
    tags: ["browser", "compatibility", "support"]
  },
  {
    id: "mobile-friendly",
    question: "Can I use the builder on mobile devices?",
    answer: "While the builder interface is optimized for desktop use, the forms you create are fully responsive and work perfectly on all devices. For the best building experience, we recommend using a desktop or tablet.",
    category: "general",
    tags: ["mobile", "responsive", "devices"]
  },

  // Technical Questions
  {
    id: "tech-stack",
    question: "What technologies does the builder use?",
    answer: "The builder is built with Next.js, React, TypeScript, Tailwind CSS, and shadcn/ui components. Generated forms use React Hook Form for form handling and Zod for validation. All code follows modern React best practices.",
    category: "technical",
    tags: ["tech stack", "react", "nextjs", "typescript"]
  },
  {
    id: "code-quality",
    question: "What does the generated code look like?",
    answer: "The generated code is clean, readable, and production-ready. It includes proper TypeScript types, follows React best practices, uses semantic HTML, and includes accessibility features. You can copy and paste it directly into your project.",
    category: "technical",
    tags: ["code generation", "quality", "typescript"]
  },
  {
    id: "customization",
    question: "Can I customize the generated code?",
    answer: "Absolutely! The generated code is standard React/TypeScript that you can modify as needed. You can adjust styling, add custom validation, integrate with your backend, or extend functionality while maintaining the core structure.",
    category: "technical",
    tags: ["customization", "modification", "flexibility"]
  },
  {
    id: "integration",
    question: "How do I integrate forms into my existing project?",
    answer: "Simply copy the generated React component code and paste it into your project. Make sure you have the required dependencies (React Hook Form, Zod, shadcn/ui components) installed. The forms work with any React-based framework.",
    category: "technical",
    tags: ["integration", "existing project", "dependencies"]
  },
  {
    id: "validation",
    question: "How does form validation work?",
    answer: "Forms use Zod for schema validation and React Hook Form for form state management. You can set validation rules like required fields, min/max length, email format, and custom patterns directly in the builder interface.",
    category: "technical",
    tags: ["validation", "zod", "react hook form"]
  },

  // Features Questions
  {
    id: "available-components",
    question: "What form components are available?",
    answer: "The builder includes text inputs, textareas, selects, checkboxes, radio buttons, date pickers, file uploads, switches, and buttons. We also have content components like rich text blocks. New components are added regularly based on user feedback.",
    category: "features",
    tags: ["components", "inputs", "form fields"]
  },
  {
    id: "templates",
    question: "Are there pre-built form templates?",
    answer: "Yes! We provide templates for common use cases like contact forms, registration forms, surveys, feedback forms, and more. Templates are organized by category (business, healthcare, education, etc.) and can be customized to your needs.",
    category: "features",
    tags: ["templates", "pre-built", "examples"]
  },
  {
    id: "drag-drop",
    question: "How does the drag-and-drop interface work?",
    answer: "Simply drag components from the sidebar and drop them onto the canvas. You can reorder elements, nest components in containers, and adjust layouts visually. The interface provides real-time preview of your form as you build it.",
    category: "features",
    tags: ["drag and drop", "interface", "visual builder"]
  },
  {
    id: "responsive-design",
    question: "Are the generated forms responsive?",
    answer: "Yes! All forms are built with responsive design principles using Tailwind CSS. Forms automatically adapt to different screen sizes and look great on desktop, tablet, and mobile devices.",
    category: "features",
    tags: ["responsive", "mobile", "tailwind css"]
  },
  {
    id: "styling-options",
    question: "Can I customize the styling and appearance?",
    answer: "The builder offers various styling options including different variants, sizes, layouts, and spacing. Since it uses Tailwind CSS and shadcn/ui, you can further customize the appearance by modifying the generated code.",
    category: "features",
    tags: ["styling", "customization", "appearance"]
  },

  // Pricing Questions
  {
    id: "free-to-use",
    question: "Is shadcn/ui Builder free to use?",
    answer: "Yes! The builder is completely free and open source. You can use it to create unlimited forms, generate code, and use it in both personal and commercial projects without any restrictions.",
    category: "pricing",
    tags: ["free", "open source", "pricing"]
  },
  {
    id: "commercial-use",
    question: "Can I use this for commercial projects?",
    answer: "Absolutely! The tool is open source and you can use the generated forms in any commercial project. There are no licensing fees, attribution requirements, or usage limitations.",
    category: "pricing",
    tags: ["commercial", "license", "business use"]
  },

  // Support Questions
  {
    id: "getting-help",
    question: "How can I get help or support?",
    answer: "You can get help through our GitHub repository where you can report issues, request features, or ask questions. The community is active and helpful. We also have documentation and examples available.",
    category: "support",
    tags: ["help", "support", "github", "community"]
  },
  {
    id: "bug-reports",
    question: "How do I report bugs or request features?",
    answer: "Please use our GitHub Issues page to report bugs or request new features. Provide as much detail as possible including steps to reproduce, expected behavior, and screenshots if applicable.",
    category: "support",
    tags: ["bugs", "features", "github issues"]
  },
  {
    id: "contributing",
    question: "Can I contribute to the project?",
    answer: "Yes! This is an open source project and contributions are welcome. You can contribute code, documentation, bug reports, feature ideas, or help other users. Check out our GitHub repository for contribution guidelines.",
    category: "support",
    tags: ["contributing", "open source", "github"]
  }
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filter FAQs based on search and category
  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Group FAQs by category
  const faqsByCategory = {
    general: filteredFAQs.filter(faq => faq.category === "general"),
    technical: filteredFAQs.filter(faq => faq.category === "technical"),
    features: filteredFAQs.filter(faq => faq.category === "features"),
    pricing: filteredFAQs.filter(faq => faq.category === "pricing"),
    support: filteredFAQs.filter(faq => faq.category === "support"),
  };


  const categoryLabels = {
    general: "General",
    technical: "Technical",
    features: "Features",
    pricing: "Pricing",
    support: "Support",
  };

  const getCategoryCount = (category: string) => {
    if (category === "all") return filteredFAQs.length;
    return faqsByCategory[category as keyof typeof faqsByCategory]?.length || 0;
  };

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
                  <BreadcrumbLink href="/faq">FAQ</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight">Frequently Asked Questions</h1>
                  <p className="text-xl text-muted-foreground mt-2">
                    Everything you need to know about shadcn/ui Builder
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <HelpCircle className="h-3 w-3" />
                  {faqData.length} Questions
                </Badge>
                <span>•</span>
                <span>Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full md:w-auto">
                <TabsTrigger value="all">All ({getCategoryCount("all")})</TabsTrigger>
                <TabsTrigger value="general">General ({getCategoryCount("general")})</TabsTrigger>
                <TabsTrigger value="technical">Technical ({getCategoryCount("technical")})</TabsTrigger>
                <TabsTrigger value="features">Features ({getCategoryCount("features")})</TabsTrigger>
                <TabsTrigger value="pricing">Pricing ({getCategoryCount("pricing")})</TabsTrigger>
                <TabsTrigger value="support">Support ({getCategoryCount("support")})</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Results */}
          {searchQuery && (
            <div className="text-sm text-muted-foreground">
              Found <strong>{filteredFAQs.length}</strong> questions matching &quot;{searchQuery}&quot;
            </div>
          )}

          {/* FAQ Content */}
          {selectedCategory === "all" ? (
            // Show all categories
            <div className="space-y-12">
              {Object.entries(faqsByCategory).map(([category, faqs]) => {
                if (faqs.length === 0) return null;
                
                const label = categoryLabels[category as keyof typeof categoryLabels];
                
                return (
                  <section key={category} className="space-y-6">
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-semibold">{label}</h2>
                    </div>
                    
                    <Accordion type="single" collapsible className="w-full">
                      {faqs.map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id}>
                          <AccordionTrigger className="text-left hover:no-underline">
                            <span className="text-base font-normal">{faq.question}</span>
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                            <div className="flex flex-wrap gap-1 mt-3">
                              {faq.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </section>
                );
              })}
            </div>
          ) : (
            // Show single category
            <div className="space-y-6">
              {filteredFAQs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFAQs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left hover:no-underline">
                        <span className="font-medium">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                        <div className="flex flex-wrap gap-1 mt-3">
                          {faq.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-12">
                  <div className="text-muted-foreground space-y-2">
                    <Search className="h-12 w-12 mx-auto opacity-50" />
                    <h3 className="text-lg font-semibold">No questions found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Contact Section */}
          <div className="bg-dotted border rounded-lg p-8 text-center space-y-4 mt-12">
            <h3 className="text-2xl font-semibold">Still have questions?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Can`t find the answer you`re looking for? Feel free to reach out to the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="https://github.com/iduspara/shadcn-builder/discussions">
                  Ask on GitHub <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/builder">
                  Try the Builder
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
