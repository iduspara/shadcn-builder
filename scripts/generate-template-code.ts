import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { FormComponentModel } from "@/models/FormComponent";
import { generateFormCode } from "@/components/form-builder/helpers/generate-react-code";
import type { FormComponentModelInput } from "@/types/FormComponent.types";

type TemplateEntry = {
  components: FormComponentModelInput[];
  formTitle?: string;
  formDescription?: string;
  tags?: string[];
  category?: string;
};

type TemplateCollection = Record<string, TemplateEntry>;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const templatesDir = path.join(projectRoot, "public", "templates");
const outputDir = path.join(templatesDir, "code");

const slugify = (value: string): string => {
  return value
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
};

const loadTemplateFile = async (filePath: string): Promise<TemplateCollection> => {
  const fileContent = await readFile(filePath, "utf-8");

  try {
    const parsed = JSON.parse(fileContent) as TemplateCollection;

    if (!parsed || typeof parsed !== "object") {
      throw new Error("Template file must export an object.");
    }

    return parsed;
  } catch (error) {
    throw new Error(
      `Failed to parse template file ${path.basename(filePath)}: ${(error as Error).message}`
    );
  }
};

const ensureUniqueSlug = (slug: string, existing: Set<string>): string => {
  if (!existing.has(slug)) {
    return slug;
  }

  let suffix = 1;
  let candidate = `${slug}-${suffix}`;
  while (existing.has(candidate)) {
    suffix += 1;
    candidate = `${slug}-${suffix}`;
  }

  return candidate;
};

async function main() {
  await mkdir(outputDir, { recursive: true });

  const entries = await readdir(templatesDir, { withFileTypes: true });
  const jsonFiles = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".json"));

  if (jsonFiles.length === 0) {
    console.warn(`No JSON template files found in ${templatesDir}.`);
    return;
  }

  const generatedFiles = new Set<string>();

  for (const fileEntry of jsonFiles) {
    const filePath = path.join(templatesDir, fileEntry.name);
    const templates = await loadTemplateFile(filePath);
    const fileSlug = slugify(path.parse(fileEntry.name).name) || "template";

    for (const [templateKey, template] of Object.entries(templates)) {
      if (!template?.components?.length) {
        console.warn(
          `Skipping template "${templateKey}" in ${fileEntry.name}: no components defined.`
        );
        continue;
      }

      const components = template.components.map(
        (component) => new FormComponentModel(component)
      );

      const formTitle = template.formTitle ?? templateKey;
      const baseSlug = slugify(templateKey) || fileSlug;
      const uniqueSlug = ensureUniqueSlug(baseSlug, generatedFiles);
      generatedFiles.add(uniqueSlug);

      const outputPath = path.join(outputDir, `${uniqueSlug}.tsx`);
      const { code } = await generateFormCode(components, formTitle);

      await writeFile(outputPath, code, "utf-8");

      console.log(
        `Generated ${path.relative(projectRoot, outputPath)} (${templateKey} from ${fileEntry.name})`
      );
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

