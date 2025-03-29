"use client";

import { useFormBuilderStore } from "@/stores/form-builder-store";
import { AVAILABLE_COMPONENTS } from "@/config/available-components";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { ComponentIcon } from "./helpers/component-icon";
import { SiGithub, SiBuymeacoffee } from '@icons-pack/react-simple-icons';
import { LinkedinIcon } from "lucide-react";

export function FormBuilderLeft() {
  const { addRow, rows, selectComponent, mode } = useFormBuilderStore();
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});
  const tabsTriggerClass =
    "relative cursor-pointer rounded-none border-b-2 p-0 pb-2 border-b-transparent bg-transparent shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none";

  // Group components by purpose
  const typographyComponents = AVAILABLE_COMPONENTS.filter(comp => comp.category === "content");
  const inputComponents = AVAILABLE_COMPONENTS.filter(comp => 
    ["input", "textarea", "number", "email", "password", "tel", "url", "file"].includes(comp.type)
  );
  const selectionComponents = AVAILABLE_COMPONENTS.filter(comp => 
    ["select", "checkbox", "checkbox-group", "radio", "switch"].includes(comp.type)
  );
  const dateComponents = AVAILABLE_COMPONENTS.filter(comp => 
    ["date"].includes(comp.type)
  );
  const buttonComponents = AVAILABLE_COMPONENTS.filter(comp => 
    ["button"].includes(comp.type)
  );

  return (
    <Sidebar className="bg-white top-14 bottom-14">
      <div className="flex flex-col h-[calc(100%-56px)]">
      <SidebarContent className="gap-0">
        <SidebarGroup>
          <SidebarGroupLabel>Typography</SidebarGroupLabel>
          <SidebarMenu>
            {typographyComponents.map((component) => (
              <SidebarMenuItem key={component.id}>
                <SidebarMenuButton onClick={() => addRow(component)}>
                  <ComponentIcon icon={component.icon} />
                  <span>{component.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Input Fields</SidebarGroupLabel>
          <SidebarMenu>
            {inputComponents.map((component) => (
              <SidebarMenuItem key={component.id}>
                <SidebarMenuButton onClick={() => addRow(component)}>
                  <ComponentIcon icon={component.icon} />
                  <span>{component.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Selection Fields</SidebarGroupLabel>
          <SidebarMenu>
            {selectionComponents.map((component) => (
              <SidebarMenuItem key={component.id}>
                <SidebarMenuButton onClick={() => addRow(component)}>
                  <ComponentIcon icon={component.icon} />
                  <span>{component.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Date & Time</SidebarGroupLabel>
          <SidebarMenu>
            {dateComponents.map((component) => (
              <SidebarMenuItem key={component.id}>
                <SidebarMenuButton onClick={() => addRow(component)}>
                  <ComponentIcon icon={component.icon} />
                  <span>{component.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Buttons</SidebarGroupLabel>
          <SidebarMenu>
            {buttonComponents.map((component) => (
              <SidebarMenuItem key={component.id}>
                <SidebarMenuButton onClick={() => addRow(component)}>
                  <ComponentIcon icon={component.icon} />
                  <span>{component.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <div className="flex flex-row gap-4 py-3 px-2">
        <a
          className="flex items-center gap-2 text-sm hover:text-slate-500"
          target="_blank"
          href="https://github.com/iduspara/shadcn-builder"
        >
          <SiGithub className="w-6 h-6" />
        </a>
        <a
          className="flex items-center gap-2 text-sm hover:text-slate-500"
          target="_blank"
          href="https://buymeacoffee.com/igorduspara"
        >
          <SiBuymeacoffee className="w-6 h-6" />
        </a>
        </div>
      </SidebarFooter>
      </div>

    </Sidebar>
  );
}
