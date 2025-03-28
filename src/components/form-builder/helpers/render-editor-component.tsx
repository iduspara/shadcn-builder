"use client";

import { FormRow } from "@/types/form-builder.types";
import { useFormBuilderStore } from "@/stores/form-builder-store";

import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";
import {
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormLabel,
} from "@/components/ui/form";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { getComponentViews } from "@/config/available-components";
import { FormComponentModel } from "../Models/FormComponent";
import { FormWysiwygEditor } from "../form-components/wysiwyg/form-wysiwyg-editor";

export interface FormComponentProps {
  row: FormRow;
  index: number;
  isLast: boolean;
  form: UseFormReturn<FieldValues, undefined>;
  component: FormComponentModel;
}

export function RenderEditorComponent({
  form,
  component,
  row,
  dndAttributes,
  dndListeners,
}: FormComponentProps & { dndAttributes: any; dndListeners: any }) {
  const { removeComponent, selectedComponent, viewport, updateComponent } =
    useFormBuilderStore();
  const rowColumns = row.components.length;

  const componentViews = getComponentViews(component);

  return (
    <div className="relative flex h-full" key={component.id}>
      <div className="relative flex-1 group/component">
        {component.category === "form" ? (
          <>
            <FormField
              control={form.control}
              name={component.id}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center select-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ">
                    <Icons.GripVertical
                      className="h-4 w-4 text-slate-400 cursor-grab active:cursor-grabbing"
                      {...dndAttributes}
                      {...dndListeners}
                    />
                    <FormLabel className="shrink-0 text-xs text-slate-500">
                      {component.getField("label", viewport)}
                    </FormLabel>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8 absolute right-0 -top-2 m-0! text-red-500 group-hover/component:opacity-100 opacity-0",
                      component.id === selectedComponent?.id && "opacity-100"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeComponent(row.id, component.id);
                    }}
                  >
                    <Icons.Trash2Icon className="h-4 w-4" />
                  </Button>
                  <FormControl>{componentViews?.render}</FormControl>
                  {component.description && (
                    <FormDescription>{component.description}</FormDescription>
                  )}
                </FormItem>
              )}
            />
          </>
        ) : (
          <div className="relative group/component">
            <>
              <div className="flex items-center select-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ">
                <Icons.GripVertical
                  className="h-4 w-4 text-slate-400 cursor-grab active:cursor-grabbing"
                  {...dndAttributes}
                  {...dndListeners}
                />
                <FormLabel className="shrink-0 text-xs text-slate-500">
                  {component.getField("label", viewport)}
                </FormLabel>
              </div>
            </>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 absolute right-0 -top-2 m-0! text-red-500 group-hover/component:opacity-100 opacity-0",
                component.id === selectedComponent?.id && "opacity-100"
              )}
              onClick={(e) => {
                e.stopPropagation();
                removeComponent(row.id, component.id);
              }}
            >
              <Icons.Trash2Icon className="h-4 w-4" />
            </Button>
            <FormWysiwygEditor
              value={component.content || ""}
              onChange={(content) => {
                updateComponent(component.id, "content", content, true)
              }}
              isEditable={selectedComponent?.id === component.id}
            />
          </div>
        )}
      </div>
    </div>
  );
}
