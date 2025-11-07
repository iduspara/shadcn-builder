import fs from "node:fs/promises";
import path from "node:path";

import { TEMPLATE_CATEGORIES } from "./constants";
import {
  TemplateCatalog,
  TemplateCatalogItem,
  TemplateCatalogSummary,
  TemplateDefinition,
} from "@/types/template.types";

const templatesDirectory = path.join(process.cwd(), "public", "templates");

type TemplateFile = Record<string, TemplateDefinition>;

async function readCategoryFile(category: string): Promise<TemplateFile | null> {
  const filePath = path.join(templatesDirectory, `${category}.json`);

  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const parsed = JSON.parse(raw) as TemplateFile;

    if (!parsed || typeof parsed !== "object") {
      return null;
    }

    return parsed;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

export async function getTemplateDefinition(
  category: string,
  key: string
): Promise<TemplateCatalogItem | null> {
  const file = await readCategoryFile(category);
  if (!file) {
    return null;
  }

  const template = file[key];
  if (!template) {
    return null;
  }

  return {
    ...template,
    formId: key,
  };
}

export async function getTemplatesCatalog(
  categories: readonly string[] = TEMPLATE_CATEGORIES
): Promise<TemplateCatalogSummary> {
  const catalog: TemplateCatalog = {};

  await Promise.all(
    categories.map(async (category) => {
      const file = await readCategoryFile(category);
      if (!file) {
        return;
      }

      const templates: TemplateCatalogItem[] = Object.entries(file).map(
        ([formId, template]) => ({
          ...template,
          formId,
        })
      );

      if (templates.length > 0) {
        catalog[category] = templates;
      }
    })
  );

  const categoriesLoaded = Object.keys(catalog);
  const totalTemplates = Object.values(catalog).reduce(
    (total, templates) => total + templates.length,
    0
  );

  return {
    templatesByCategory: catalog,
    categoriesLoaded,
    totalTemplates,
  };
}

