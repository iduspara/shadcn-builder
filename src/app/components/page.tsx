"use client";

import { useState } from "react";
import { AVAILABLE_COMPONENTS, NEW_COMPONENTS } from "@/config/available-components";
import { FormComponentModel } from "@/models/FormComponent";
import Header from "@/components/landingpage/header";
import Footer from "@/components/landingpage/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Eye,
  Code2,
  ExternalLink,
  ArrowRight,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

type ViewMode = "grid" | "list";
type FilterCategory = "all" | "form" | "content";

export default function ComponentsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filterCategory, setFilterCategory] = useState<FilterCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Group components by category
  const formComponents = AVAILABLE_COMPONENTS.filter(c => c.category === "form");
  const contentComponents = AVAILABLE_COMPONENTS.filter(c => c.category === "content");

  // Filter components based on search and category
  const filterComponents = (components: FormComponentModel[]) => {
    return components.filter(component => {
      const matchesSearch = searchQuery === "" || 
        component.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.label_info.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.type.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = filterCategory === "all" || component.category === filterCategory;
      
      return matchesSearch && matchesCategory;
    });
  };

  const filteredFormComponents = filterComponents(formComponents);
  const filteredContentComponents = filterComponents(contentComponents);
  const allFilteredComponents = filterComponents(AVAILABLE_COMPONENTS);

  const ComponentIcon = ({ iconName }: { iconName: string }) => {
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons] as React.ComponentType<any>;
    return Icon ? <Icon className="h-5 w-5" /> : <div className="h-5 w-5 bg-muted rounded" />;
  };

  const ComponentCard = ({ component }: { component: FormComponentModel }) => (
    <Card className="group hover:shadow-md transition-all duration-200 hover:border-primary/20">
      <CardHeader className="">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-2 rounded-md text-slate-500">
              <ComponentIcon iconName={component.icon} />
            </div>
            <div>
              <CardTitle className="text-lg">{component.label}</CardTitle>
              <CardDescription className="text-sm">{component.label_info}</CardDescription>
            </div>
          </div>
          {NEW_COMPONENTS.includes(component.type) && (
            <Badge variant="default" className="">
              New
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0 flex-1 gap-2 flex flex-col justify-between">
          <div className="text-sm text-muted-foreground">
            <strong>Type:</strong> <code className="text-xs bg-muted px-1 py-0.5 rounded">{component.type}</code>
          </div>
          
          {component.attributes && Object.keys(component.attributes).length > 0 && (
            <div className="text-sm text-muted-foreground">
              <strong>Default Attributes:</strong>
              <div className="mt-1 space-y-1">
                {Object.entries(component.attributes).map(([key, value]) => (
                  <div key={key} className="text-xs">
                    <code className="bg-muted px-1 py-0.5 rounded mr-1">{key}</code>
                    <span>{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {component.options && component.options.length > 0 && (
            <div className="text-sm text-muted-foreground">
              <strong>Default Options:</strong>
              <div className="mt-1 space-y-1">
                {component.options.slice(0, 3).map((option, idx) => (
                  <div key={idx} className="text-xs flex items-center gap-2">
                    <code className="bg-muted px-1 py-0.5 rounded">{option.value}</code>
                    <span>{option.label}</span>
                  </div>
                ))}
                {component.options.length > 3 && (
                  <div className="text-xs text-muted-foreground">
                    +{component.options.length - 3} more options
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" className="flex-1" asChild>
              <a href="/builder">
                <Eye className="h-4 w-4 mr-1" />
                Try in Builder
              </a>
            </Button>
          </div>
      </CardContent>
    </Card>
  );

  const ComponentListItem = ({ component }: { component: FormComponentModel }) => (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="bg-slate-100 p-2 rounded-md text-slate-500">
          <ComponentIcon iconName={component.icon} />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold">{component.label}</h3>
          <p className="text-sm text-muted-foreground">{component.label_info}</p>
          <div className="flex items-center gap-2 mt-1">
            {NEW_COMPONENTS.includes(component.type) && (
              <Badge variant="default" className="">
                New
              </Badge>
            )}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">{component.type}</code>
          </div>
        </div>
      </div>
      <Button size="sm" variant="outline" asChild>
        <a href="/builder">
          Try <ArrowRight className="h-4 w-4 ml-1" />
        </a>
      </Button>
    </div>
  );

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-16 md:py-24 max-w-7xl">
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
                  <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">Components</h1>
              <p className="text-xl text-muted-foreground">
                Discover all available components for building powerful forms with drag-and-drop simplicity
              </p>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span><strong>{AVAILABLE_COMPONENTS.length}</strong> total components</span>
              </div>
              <div className="flex items-center gap-2">
                <Grid className="h-4 w-4 text-primary" />
                <span><strong>{formComponents.length}</strong> form components</span>
              </div>
              <div className="flex items-center gap-2">
                <List className="h-4 w-4 text-primary" />
                <span><strong>{contentComponents.length}</strong> content components</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search components..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Tabs value={filterCategory} onValueChange={(value) => setFilterCategory(value as FilterCategory)}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="form">Form</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Results */}
          {searchQuery && (
            <div className="text-sm text-muted-foreground">
              Found <strong>{allFilteredComponents.length}</strong> components matching &quot;{searchQuery}&quot;
            </div>
          )}

          {/* Components by Category */}
          {filterCategory === "all" ? (
            <Tabs defaultValue="form" className="space-y-6">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="form">Form Components ({filteredFormComponents.length})</TabsTrigger>
                <TabsTrigger value="content">Content Components ({filteredContentComponents.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="form" className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Form Components</h2>
                  <p className="text-muted-foreground">
                    Interactive form inputs and controls for collecting user data
                  </p>
                </div>
                
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredFormComponents.map((component) => (
                      <ComponentCard key={component.id} component={component} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredFormComponents.map((component) => (
                      <ComponentListItem key={component.id} component={component} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="content" className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Content Components</h2>
                  <p className="text-muted-foreground">
                    Rich content elements for enhancing your forms with text, media, and formatting
                  </p>
                </div>
                
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredContentComponents.map((component) => (
                      <ComponentCard key={component.id} component={component} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredContentComponents.map((component) => (
                      <ComponentListItem key={component.id} component={component} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  {filterCategory === "form" ? "Form Components" : "Content Components"}
                </h2>
                <p className="text-muted-foreground">
                  {filterCategory === "form" 
                    ? "Interactive form inputs and controls for collecting user data"
                    : "Rich content elements for enhancing your forms with text, media, and formatting"
                  }
                </p>
              </div>
              
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(filterCategory === "form" ? filteredFormComponents : filteredContentComponents).map((component) => (
                    <ComponentCard key={component.id} component={component} />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {(filterCategory === "form" ? filteredFormComponents : filteredContentComponents).map((component) => (
                    <ComponentListItem key={component.id} component={component} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {allFilteredComponents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground space-y-2">
                <Search className="h-12 w-12 mx-auto opacity-50" />
                <h3 className="text-lg font-semibold">No components found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            </div>
          )}

          {/* CTA Section */}
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
                <Link href="/templates">
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
