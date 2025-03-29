import { FormRow } from "@/types/form-builder.types";
import { FormComponentModel } from "../Models/FormComponent";
import { getComponentViews } from "@/config/available-components";
import { cn, generateTWClassesForAllViewports } from "@/lib/utils";
import { useFormBuilderStore } from "@/stores/form-builder-store";

export type DependenciesImports = Record<string, string[]>;

const dependenciesImports: DependenciesImports = {
  "@/components/ui/form": [
    "Form",
    "FormControl",
    "FormDescription",
    "FormField",
    "FormItem",
    "FormLabel",
    "FormMessage",
  ],
  "@hookform/resolvers/zod": ["zodResolver"],
  zod: ["z"],
  "react-hook-form": ["useForm"],
};


const generateComponentCode = (component: FormComponentModel): string => {
  const componentViews = getComponentViews(component);
  const reactCode = componentViews?.reactCode;

  if (reactCode?.dependencies) {
    Object.entries(reactCode.dependencies).forEach(([key, values]) => {
      if (dependenciesImports[key]) {
        // Add new values that don't already exist
        values.forEach((value) => {
          if (!dependenciesImports[key].includes(value)) {
            dependenciesImports[key].push(value);
          }
        });
      } else {
        // Create new key with values
        dependenciesImports[key] = values;
      }
    });
  }

  return reactCode?.code || "";
};

const generateImports = (): string => {
  return Object.entries(dependenciesImports)
    .map(([key, values]) => `import { ${values.join(", ")} } from "${key}";`)
    .join("\n");
};



const generateFormCode = async (rows: FormRow[]): Promise<{ code: string; dependenciesImports: DependenciesImports;  }> => {
  const formTitle = useFormBuilderStore.getState().formTitle;
  const formCode = rows
    .map((row) => {
      const components = row.components
        .map((comp) => {
          const componentCode = generateComponentCode(comp);

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
          return comp.category === "form"
            ? `          <FormField
            control={form.control}
            name="${comp.getField("attributes.id")}"
            render={({ field }) => (
              <FormItem className="${cn(
                colSpanClasses,
                colStartClasses,
                visibilityClasses,
                "flex flex-col",
                labelPositionClasses,
                labelAlignClasses
              )}"
              >
                <FormLabel className="${cn(
                  labelClasses,
                  "shrink-0"
                )}">${comp.getField("label")}</FormLabel>
                ${
                  comp.type === "checkbox-group" && comp.label_description
                    ? `<FormDescription className="-mt-2 mb-2.5">
                    ${comp.label_description}
                  </FormDescription>`
                    : ""
                }
                <div className="w-full">
                  <FormControl>
                    ${componentCode}
                  </FormControl>
                  ${
                    comp.description
                      ? `<FormDescription>
                      ${comp.description}
                    </FormDescription>`
                      : ""
                  }
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />`
            : componentCode;
        })
        .join("\n");

      return `        <div className="grid grid-cols-12 gap-4">
${components}
        </div>`;
    })
    .join("\n");

  const imports = generateImports();

  const code = `
"use client";
${imports}

export default function ${formTitle.replace(/\s+/g, '')}() {
  const formSchema = z.object({
    ${rows
      .map((row) => {
        return row.components
          .map((comp) => {
            return `"${comp.getField("attributes.id")}": z.string(),`;
          })
          .join("\n");
      })
      .join("\n")}
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ${rows
        .map((row) => {
          return row.components
            .map((comp) => {
              return `"${comp.getField("attributes.id")}": "",`;
            })
            .join("\n");
        })
        .join("\n")}
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
${formCode}
      </form>
    </Form>
  );
}`;

  return { code, dependenciesImports };
};

export { generateFormCode };
