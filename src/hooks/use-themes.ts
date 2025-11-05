import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuthState } from "@/hooks/use-auth";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { Id } from "../../convex/_generated/dataModel";
import { useEffect } from "react";
import type React from "react";

export function useUserThemes() {
  const { user } = useAuthState();
  
  const themes = useQuery(api.themes.getUserThemes, { 
    userId: user?.id || ""
  });
  
  const defaultTheme = useQuery(api.themes.getDefaultTheme, {
    userId: user?.id || ""
  });
  
  return {
    themes: themes || [],
    defaultTheme: defaultTheme || null,
    isLoading: themes === undefined || defaultTheme === undefined,
  };
}

export function useSaveTheme() {
  const { user } = useAuthState();
  
  const saveTheme = useMutation(api.themes.saveTheme);
  
  const saveThemeHandler = async (params: {
    id?: Id<"userThemes">;
    name: string;
    css: string;
    isDefault?: boolean;
  }) => {
    if (!user?.id) {
      throw new Error("User must be authenticated to save themes");
    }
    
    const themeId = await saveTheme({
      id: params.id,
      userId: user.id,
      name: params.name,
      css: params.css,
      isDefault: params.isDefault,
    });
    
    // Convex queries auto-refetch after mutations, no need to manually update
    
    return themeId;
  };
  
  return saveThemeHandler;
}

export function useDeleteTheme() {
  const deleteTheme = useMutation(api.themes.deleteTheme);
  
  const deleteThemeHandler = async (id: Id<"userThemes">) => {
    await deleteTheme({ id });
    
    // Convex queries auto-refetch after mutations, no need to manually update
  };
  
  return deleteThemeHandler;
}

export function useSetDefaultTheme() {
  const { user } = useAuthState();
  
  const setDefaultTheme = useMutation(api.themes.setDefaultTheme);
  
  const setDefaultThemeHandler = async (id: Id<"userThemes">) => {
    if (!user?.id) {
      throw new Error("User must be authenticated to set default theme");
    }
    
    await setDefaultTheme({ id, userId: user.id });
    
    // Convex queries auto-refetch after mutations, no need to manually update
  };
  
  return setDefaultThemeHandler;
}

export function useUnsetDefaultTheme() {
  const { user } = useAuthState();
  
  const unsetDefaultTheme = useMutation(api.themes.unsetDefaultTheme);
  
  const unsetDefaultThemeHandler = async (id: Id<"userThemes">) => {
    if (!user?.id) {
      throw new Error("User must be authenticated to unset default theme");
    }
    
    await unsetDefaultTheme({ id, userId: user.id });
    
    // Convex queries auto-refetch after mutations, no need to manually update
  };
  
  return unsetDefaultThemeHandler;
}

export function useApplyTheme() {
  const setCurrentTheme = useFormBuilderStore((state) => state.setCurrentTheme);
  const clearTheme = useFormBuilderStore((state) => state.clearTheme);
  
  const applyTheme = (css: string | null) => {
    setCurrentTheme(css);
  };
  
  const removeTheme = () => {
    clearTheme();
  };
  
  return { applyTheme, removeTheme };
}

