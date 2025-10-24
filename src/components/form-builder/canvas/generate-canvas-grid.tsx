"use client";

import { RowColumn } from "@/components/form-builder/canvas/sortable-row";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { z } from "zod";
import {
  getZodSchemaForComponents,
  getZodDefaultValues,
} from "@/components/form-builder/helpers/zod";
import { FormDataDialog } from "@/components/form-builder/dialogs/form-data-dialog";
import { FormComponentModel } from "@/models/FormComponent";

export default function GenerateCanvasGrid({
  components
}: {
  components: FormComponentModel[];
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});

  // Split store selectors to minimize re-renders
  const selectComponent = useFormBuilderStore((state) => state.selectComponent);
  const mode = useFormBuilderStore((state) => state.mode);

  // Create a new form schema whenever components change
  const formSchema = getZodSchemaForComponents(components, false) as z.ZodObject<Record<string, z.ZodTypeAny>>;
  const defaultValues = getZodDefaultValues(components);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  // Update form when components change
  useEffect(() => {
    // Update the form with new schema and values
    form.clearErrors();
    form.reset();
  }, [mode, form]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    selectComponent(null);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setFormData(values);
    setIsDialogOpen(true);
  }

  function onReset() {
    form.clearErrors();
    form.reset(defaultValues);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onReset={onReset}
          className="space-y-8 @container"
        >
          <div
            className={`grid grid-cols-12 gap-4`}
            onClick={mode === "editor" ? handleClick : undefined}
          >
            {components.map((component, index) => (
              <RowColumn
                key={component.id}
                component={component}
                index={index}
                form={form}
              />
            ))}
          </div>
        </form>
      </Form>
      <FormDataDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        data={formData}
      />
    </>
  );
}
