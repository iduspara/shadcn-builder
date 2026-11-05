import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { FormComponentModel } from "@/models/FormComponent";
import type { FormComponentModelInput } from "@/types/FormComponent.types";

export const FIXED_NOW = new Date("2025-01-15T12:00:00.000Z");

const templatesDir = path.resolve(__dirname, "../public/templates");

export interface TemplateFixture {
  name: string;
  title: string;
  components: FormComponentModelInput[];
}

export function loadTemplates(): TemplateFixture[] {
  return readdirSync(templatesDir)
    .filter((file) => file.endsWith(".json"))
    .sort()
    .flatMap((file) => {
      const collection = JSON.parse(
        readFileSync(path.join(templatesDir, file), "utf-8")
      ) as Record<string, { formTitle?: string; components?: FormComponentModelInput[] }>;
      return Object.entries(collection)
        .filter(([, t]) => t?.components?.length)
        .map(([key, t]) => ({
          name: `${file}/${key}`,
          title: t.formTitle ?? key,
          components: t.components!,
        }));
    });
}

export const toModels = (inputs: FormComponentModelInput[]) =>
  inputs.map((input) => new FormComponentModel(input));
