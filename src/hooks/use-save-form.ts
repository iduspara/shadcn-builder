import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { useAuthState } from "@/hooks/use-auth";

export interface SaveFormOptions {
  title?: string;
  description?: string;
  tags?: string[];
  category?: string;
  forceNew?: boolean;
}

/** Form fields sent to Convex, with defaults for anything the caller left out. */
export function buildFormPayload<T>(
  options: SaveFormOptions | undefined,
  formTitle: string,
  components: T[]
) {
  return {
    title: options?.title || formTitle,
    description: options?.description || "Form created with Form Builder",
    components,
    tags: options?.tags || [],
    category: options?.category || "custom",
  };
}

export function useSaveForm() {
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuthState();
  const saveForm = useMutation(api.forms.saveForm);
  const updateForm = useMutation(api.forms.updateForm);
  
  const components = useFormBuilderStore((state) => state.components);
  const formTitle = useFormBuilderStore((state) => state.formTitle);
  const formId = useFormBuilderStore((state) => state.formId);

  const saveCurrentForm = async (options?: SaveFormOptions) => {
    if (components.length === 0) {
      throw new Error("Please add some components before saving.");
    }

    setIsSaving(true);
    try {
      // Convert FormComponentModel instances to plain objects for storage
      const payload = buildFormPayload(
        options,
        formTitle,
        components.map((component) => component.toJSON())
      );

      // Update the existing form unless a new copy is requested
      if (formId && !options?.forceNew) {
        await updateForm({ id: formId as any, ...payload }); // Type assertion needed for Convex ID
        return formId;
      }

      return await saveForm({ ...payload, userId: user?.id });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    saveCurrentForm,
    isSaving,
    canSave: components.length > 0,
  };
}
