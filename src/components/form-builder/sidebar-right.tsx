"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { FormComponentConfig } from "./editor/properties/form-component-config";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CodeIcon } from "lucide-react";

export function FormBuilderRight() {
  const { mode, showJson, toggleJsonPreview } = useFormBuilderStore();
  return (
    <Sidebar side="right" className="border-l top-14">
      <SidebarContent>
        <FormComponentConfig />
      </SidebarContent>
    </Sidebar>
  );
}
