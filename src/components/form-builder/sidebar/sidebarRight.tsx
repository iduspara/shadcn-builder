"use client";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

import { useFormBuilderStore } from "@/stores/form-builder-store";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getComponentViews } from "@/config/available-components";
import { ReactNode } from "react";

interface PropertySectionProps {
  title: string;
  children: ReactNode;
}

function PropertySection({ title, children }: PropertySectionProps) {
  return (
    <Collapsible className="border-b" defaultOpen={true}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 cursor-pointer">
        <span className="font-normal text-sm">{title}</span>
        <ChevronDown className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4 pt-0 space-y-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

const PROPERTY_SECTIONS = [
  { key: "options", title: "Options" },
  { key: "base", title: "Base" },
  { key: "button", title: "Button" },
  { key: "input", title: "Input" },
  { key: "label", title: "Label" },
  { key: "grid", title: "Grid layout" },
  { key: "html", title: "HTML" },
] as const;

export function SidebarRight() {
  const { selectedComponent } = useFormBuilderStore();

  let sidebarContent;

  if (!selectedComponent) {
    sidebarContent = (
      <div className="p-4">
        <p className="text-sm text-muted-foreground">
          Select a component to configure its properties
        </p>
      </div>
    );
  } else {
    const componentViews = getComponentViews(selectedComponent);

    if (!componentViews) {
      sidebarContent = (
        <div className="p-4">
          <p className="text-sm text-muted-foreground">
            No properties available for this component
          </p>
        </div>
      );
    } else {
      sidebarContent = (
        <div>
          <div className="p-4 border-b">Properties</div>

          {PROPERTY_SECTIONS.map(({ key, title }) => {
            const content = componentViews.renderDesignProperties[key];
            if (!content) return null;

            return (
              <PropertySection key={key} title={title}>
                {content}
              </PropertySection>
            );
          })}
        </div>
      );
    }
  }

  return (
    <Sidebar side="right" className="border-l top-14">
      <SidebarContent>{sidebarContent}</SidebarContent>
    </Sidebar>
  );
}
