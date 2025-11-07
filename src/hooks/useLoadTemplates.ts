import { useState, useEffect, useCallback, useMemo, useRef } from "react";
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

  const requestIdRef = useRef(0);

  const defaultCategories = useMemo(() => [...TEMPLATE_CATEGORIES], []);

  const defaultCategoriesKey = useMemo(
    () => JSON.stringify(defaultCategories),
    [defaultCategories]
  );

  const categoriesKey = useMemo(() => {
    if (!Array.isArray(categories) || categories.length === 0) {
      return defaultCategoriesKey;
    }
    return JSON.stringify(categories);
  }, [categories, defaultCategoriesKey]);

  const normalizedCategories = useMemo(() => {
    const parsedCategories = JSON.parse(categoriesKey) as string[];

    const seen = new Set<string>();
    const deduped: string[] = [];

    parsedCategories.forEach((category) => {
      if (typeof category === "string" && !seen.has(category)) {
        seen.add(category);
        deduped.push(category);
      }
    });

    return deduped.length > 0 ? deduped : defaultCategories;
  }, [categoriesKey, defaultCategories]);

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
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    try {
      setIsLoading(true);
      setError(null);

      // Load all categories in parallel for better performance
      const loadPromises = normalizedCategories.map(async (category) => {
        try {
          const templates = await loadCategory(category);
          return { category, templates, isError: false } as const;
        } catch (loadError) {
          console.error(`Failed to load category ${category}:`, loadError);
          return { category, templates: [] as LoadedTemplate[], isError: true } as const;
        }
      });

      const results = await Promise.all(loadPromises);

      if (requestIdRef.current !== requestId) {
        return;
      }

      const nextTemplates: LoadedTemplatesByCategory = {};
      const failedCategories: string[] = [];

      results.forEach(({ category, templates, isError }) => {
        nextTemplates[category] = templates;

        if (isError) {
          failedCategories.push(category);
        }
      });

      setAllTemplates(nextTemplates);

      if (failedCategories.length > 0) {
        const successCount = normalizedCategories.length - failedCategories.length;
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
      if (requestIdRef.current !== requestId) {
        return;
      }

      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setError(`Failed to load templates: ${errorMessage}`);
      console.error("Failed to load templates:", error);
    } finally {
      if (requestIdRef.current === requestId) {
        setIsLoading(false);
      }
    }
  }, [normalizedCategories, loadCategory]);

  // Retry function
  const retry = useCallback(() => {
    setLoadAttempt((prev) => prev + 1);
  }, []);

  // Load templates on mount and when retry is called
  useEffect(() => {
    loadTemplates();
  }, [loadTemplates, loadAttempt]);

  useEffect(
    () => () => {
      requestIdRef.current += 1;
    },
    []
  );

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
