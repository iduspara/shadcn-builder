import { useState, useEffect, useCallback, useMemo } from "react";
import { TEMPLATE_CATEGORIES } from "@/lib/templates/constants";

export type LoadedTemplate = {
  formId: string;
  formTitle: string;
  formDescription: string;
  tags: string[];
  components: {}[];
  image: string;
  category: string;
};

export type LoadedTemplatesByCategory = Record<string, LoadedTemplate[]>;

export interface UseLoadTemplatesOptions {
  categories?: string[];
  retryAttempts?: number;
  retryDelay?: number;
}

export interface UseLoadTemplatesReturn {
  allTemplates: LoadedTemplatesByCategory;
  isLoading: boolean;
  error: string | null;
  hasData: boolean;
  retry: () => void;
  totalTemplates: number;
  categoriesLoaded: string[];
}

export function useLoadTemplates(
  options: UseLoadTemplatesOptions = {}
): UseLoadTemplatesReturn {
  const {
    categories = TEMPLATE_CATEGORIES,
    retryAttempts = 3,
    retryDelay = 1000,
  } = options;

  const [isLoading, setIsLoading] = useState(true);
  const [allTemplates, setAllTemplates] = useState<LoadedTemplatesByCategory>(
    {}
  );
  const [error, setError] = useState<string | null>(null);
  const [loadAttempt, setLoadAttempt] = useState(0);

  // Helper function to delay execution
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // Helper function to load a single category with retry logic
  const loadCategory = useCallback(
    async (
      category: string,
      attempt: number = 1
    ): Promise<LoadedTemplate[]> => {
      try {
        const response = await fetch(`/templates/${category}.json`);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const categoryData = await response.json();

        if (!categoryData || typeof categoryData !== "object") {
          throw new Error("Invalid JSON structure");
        }

        const formIds = Object.keys(categoryData);
        return formIds
          .map((formId) => {
            const template = categoryData[formId];
            if (!template || typeof template !== "object") {
              console.warn(
                `Invalid template data for ${formId} in ${category}`
              );
              return null;
            }
            return {
              ...template,
              formId: formId,
              category: category,
            };
          })
          .filter(Boolean) as LoadedTemplate[];
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";

        if (attempt < retryAttempts) {
          console.warn(
            `Failed to load ${category}.json (attempt ${attempt}/${retryAttempts}): ${errorMessage}. Retrying...`
          );
          await delay(retryDelay * attempt); // Exponential backoff
          return loadCategory(category, attempt + 1);
        } else {
          console.error(
            `Failed to load ${category}.json after ${retryAttempts} attempts: ${errorMessage}`
          );
          throw new Error(`Failed to load ${category}: ${errorMessage}`);
        }
      }
    },
    [retryAttempts, retryDelay]
  );

  // Main loading function
  const loadTemplates = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Load all categories in parallel for better performance
      const loadPromises = categories.map((category) =>
        loadCategory(category).then((templates) => ({ category, templates }))
      );

      const results = await Promise.allSettled(loadPromises);

      const allTemplates: LoadedTemplatesByCategory = {};
      const failedCategories: string[] = [];

      results.forEach((result, index) => {
        const category = categories[index];

        if (result.status === "fulfilled") {
          allTemplates[category] = result.value.templates;
        } else {
          failedCategories.push(category);
          console.error(`Failed to load category ${category}:`, result.reason);
        }
      });

      setAllTemplates(allTemplates);

      // Set error if some categories failed to load
      if (failedCategories.length > 0) {
        const successCount = categories.length - failedCategories.length;
        if (successCount === 0) {
          setError(
            "Failed to load any templates. Please check your internet connection and try again."
          );
        } else {
          setError(
            `Failed to load ${failedCategories.length} categories: ${failedCategories.join(", ")}`
          );
        }
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setError(`Failed to load templates: ${errorMessage}`);
      console.error("Failed to load templates:", error);
    } finally {
      setIsLoading(false);
    }
  }, [categories, loadCategory]);

  // Retry function
  const retry = useCallback(() => {
    setLoadAttempt((prev) => prev + 1);
  }, []);

  // Load templates on mount and when retry is called
  useEffect(() => {
    loadTemplates();
  }, [loadTemplates, loadAttempt]);

  // Computed values for better UX
  const hasData = useMemo(
    () => Object.keys(allTemplates).length > 0,
    [allTemplates]
  );

  const totalTemplates = useMemo(
    () =>
      Object.values(allTemplates).reduce(
        (total, templates) => total + templates.length,
        0
      ),
    [allTemplates]
  );

  const categoriesLoaded = useMemo(
    () => Object.keys(allTemplates),
    [allTemplates]
  );

  return {
    allTemplates,
    isLoading,
    error,
    hasData,
    retry,
    totalTemplates,
    categoriesLoaded,
  };
}
