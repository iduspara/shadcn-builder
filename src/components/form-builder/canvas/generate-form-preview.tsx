import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { cn, generateTWClassesForAllViewports } from "@/lib/utils";
import { getComponentViews } from "@/config/available-components";

export function GenerateFormPreview() {
  const { rows, viewport } = useFormBuilderStore();

  // Create the zod schema dynamically based on components inside rows
  const formSchema = z.object({
    ...rows.reduce(
      (acc, row) => ({
        ...acc,
        ...row.components.reduce(
          (acc, comp) => ({
            ...acc,
            [comp.label.toLowerCase().replace(/\s+/g, "_")]: z.string().min(1, {
              message: `${comp.label} is required`,
            }),
          }),
          {}
        ),
      }),
      {}
    ),
  });

  // Create the form with react-hook-form and zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: rows.reduce(
      (acc, row) => ({
        ...acc,
        ...row.components.reduce(
          (acc, comp) => ({
            ...acc,
            [comp.label.toLowerCase().replace(/\s+/g, "_")]: "",
          }),
          {}
        ),
      }),
      {}
    ),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="[&>div]:my-6 [&>div:last-child]:mb-0 [&>div:first-child]:mt-0  bg-white"
      >
        {rows.map((row) => {
          const oneCompViews = getComponentViews(row.components[0], row);

          return row.components.length > 1 ||
            (row.components.length === 1 &&
              row.components[0].category === "form") ? (
            <div key={row.id} className={cn(`grid grid-cols-12 gap-4`)}>
              {row.components.map((comp) => {
                const inputName = comp.id;
                const componentViews = getComponentViews(comp, row);

                const colSpanClasses = generateTWClassesForAllViewports(
                  comp,
                  "colSpan",
                  row
                );
                const colStartClasses = generateTWClassesForAllViewports(
                  comp,
                  "colStart",
                  row
                );

                const labelClasses = generateTWClassesForAllViewports(
                  comp,
                  "showLabel",
                  row
                );

                const labelPositionClasses = generateTWClassesForAllViewports(
                  comp,
                  "labelPosition"
                );

                const labelAlignClasses = generateTWClassesForAllViewports(
                  comp,
                  "labelAlign"
                );

                const visibilityClasses = generateTWClassesForAllViewports(
                  comp,
                  "visible"
                );

                return comp.category === "form" ? (
                  <FormField
                    key={comp.id}
                    control={form.control}
                    name={comp.id as never}
                    render={({ field }) => (
                      <FormItem
                        className={cn(
                          colSpanClasses,
                          colStartClasses,
                          visibilityClasses,
                          `flex flex-col`,
                          labelPositionClasses,
                          labelAlignClasses
                        )}
                      >
                        <FormLabel
                          className={cn(labelClasses, "shrink-0")}
                          htmlFor={inputName}
                        >
                          {comp.getField("label")}
                        </FormLabel>
                        {comp.type === "checkbox-group" && comp.label_description && (
                          <FormDescription className="-mt-2 mb-2.5">{comp.label_description}</FormDescription>
                        )}
                        <div className="w-full">
                          <FormControl>{componentViews?.render}</FormControl>
                        </div>
                        {comp.description && (
                          <FormDescription>{comp.description}</FormDescription>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  componentViews?.render
                );
              })}
            </div>
          ) : (
            oneCompViews?.render
          );
        })}
      </form>
    </Form>
  );
}
