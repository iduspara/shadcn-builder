import { FormComponentModel } from "@/models/FormComponent";
import { getComponentReactCode } from "@/config/available-components";
import { cn, generateTWClassesForAllViewports } from "@/lib/utils";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { getZodDefaultValuesAsString, getZodSchemaForComponents } from "./zod";
import * as prettier from "prettier/standalone";
import * as parserTypescript from "prettier/parser-typescript";
import * as prettierPluginEstree from "prettier/plugins/estree";
import { Plugin } from "prettier";

export type DependenciesImports = Record<string, string[] | string>;

const dependenciesImports: DependenciesImports = {
  "@/components/ui/field": [
    "Field",
    "FieldDescription",
    "FieldLabel",
    "FieldError",
  ],
  "@/components/ui/input-group": [
    "InputGroup",
    "InputGroupInput",
    "InputGroupAddon",
  ],
  "@hookform/resolvers/zod": ["zodResolver"],
  zod: ["z"],
  "react-hook-form": ["useForm", "Controller"],
  "react": ["useState", "useEffect"],
};

const thirdPartyDependenciesImports: string[] = []


const generateComponentCode = (component: FormComponentModel): string => {
  const reactCode = getComponentReactCode(component);

  if (reactCode?.dependencies) {
    Object.entries(reactCode.dependencies).forEach(([key, values]) => {
      if (dependenciesImports[key]) {

        if (Array.isArray(values)) {
        // Add new values that don't already exist
        values.forEach((value) => {
          if (!dependenciesImports[key].includes(value) && Array.isArray(dependenciesImports[key])) {
              dependenciesImports[key].push(value);
            }
          });
        } else {
          if (!dependenciesImports[key].includes(values) && Array.isArray(dependenciesImports[key])) {
            dependenciesImports[key].push(values);
          }
        }
      } else {
        // Create new key with values
        dependenciesImports[key] = values;
      }
    });
  }

  if (reactCode?.thirdPartyDependencies) {
    reactCode.thirdPartyDependencies.forEach((dependency) => {
      if (!thirdPartyDependenciesImports.includes(dependency)) {
        thirdPartyDependenciesImports.push(dependency);
      }
    });

  }

  return reactCode?.template || "";
};


const generateImports = (): string => {
  return Object.entries(dependenciesImports)
    .map(([key, values]) => {
      if (Array.isArray(values)) {
        return `import { ${values.join(", ")} } from "${key}";`
      } else {
        return `import ${values} from "${key}";`
      }
    })
    .join("\n");
};

const generateComponentLogic = (components: FormComponentModel[]): string => {
  const componentLogic = components.map((comp) => {
    const reactCode = getComponentReactCode(comp);
    if (reactCode?.logic) {
      return reactCode.logic;
    }
  });
  return componentLogic.join("\n");
};

const generateFormCode = async (
  components: FormComponentModel[],
  formName?: string
): Promise<{ code: string; dependenciesImports: DependenciesImports; thirdPartyDependenciesImports: string[] }> => {
  const formTitle = useFormBuilderStore.getState().formTitle || formName || "Generated Form";
  const componentLogic = generateComponentLogic(components);

  const componentsMap = components
    .map((comp) => {
      const componentCode = generateComponentCode(comp);

      const colSpanClasses = generateTWClassesForAllViewports(comp, "colSpan");
      const colStartClasses = generateTWClassesForAllViewports(
        comp,
        "colStart"
      );

      const labelClasses = generateTWClassesForAllViewports(comp, "showLabel");

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
        ? `          <Controller
            control={form.control}
            name="${comp.getField("attributes.id")}"
            render={({ field, fieldState }) => (
              <Field className="${cn(
                colSpanClasses,
                colStartClasses,
                visibilityClasses,
                "flex flex-col self-end",
                labelPositionClasses,
                labelAlignClasses
              )}" data-invalid={fieldState.invalid}>
                <FieldLabel className="${cn(
                  labelClasses,
                  "shrink-0"
                )}">${comp.getField("label")}</FieldLabel>
                ${
                  comp.type === "checkbox-group" && comp.label_description
                    ? `<FieldDescription className="-mt-2 mb-2.5">
                    ${comp.label_description}
                  </FieldDescription>`
                    : ""
                }
                  ${componentCode}
                  ${
                    comp.description
                      ? `<FieldDescription>
                      ${comp.description}
                    </FieldDescription>`
                      : ""
                  }
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />`
        : componentCode;
    })
    .join("\n");

  const formCode = `<div className="grid grid-cols-12 gap-4">
${componentsMap}
        </div>`;

  const imports = generateImports();

  const code = `
"use client";
${imports}

export default function ${formTitle.replace(/\s+/g, "").charAt(0).toUpperCase() + formTitle.replace(/\s+/g, "").slice(1)}() {
  const formSchema = ${getZodSchemaForComponents(components, true)};

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ${getZodDefaultValuesAsString(components)}
    },
  });

  ${componentLogic}

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  
  function onReset() {
    form.reset();
    form.clearErrors();
  }

  return (
      <form onSubmit={form.handleSubmit(onSubmit)} onReset={onReset} className="space-y-8 @container">
${formCode}
      </form>
  );
}`;


const formattedCode = await prettier.format(code, {
  parser: "typescript",
  plugins: [parserTypescript, prettierPluginEstree as Plugin],
  semi: true,
  singleQuote: false,
})


  return { code: formattedCode, dependenciesImports, thirdPartyDependenciesImports };
};

export { generateFormCode };
