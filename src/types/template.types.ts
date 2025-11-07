import { FormComponentModelInput } from "./FormComponent.types";

export interface TemplateDefinition {
  formTitle: string;
  formDescription: string;
  tags: string[];
  category: string;
  components: FormComponentModelInput[];
  image?: string;
}

export interface TemplateCatalogItem extends TemplateDefinition {
  formId: string;
}

export type TemplateCatalog = Record<string, TemplateCatalogItem[]>;

export interface TemplateCatalogSummary {
  templatesByCategory: TemplateCatalog;
  categoriesLoaded: string[];
  totalTemplates: number;
}

