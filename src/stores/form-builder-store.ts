import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FormBuilderStore, TemplateData, Viewports, HistorySnapshot, HistoryState } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
import { Editor } from "@tiptap/react";
import { SubscriptionInfo, DEFAULT_HISTORY_SIZE } from "@/types/subscription.types";
import { getHistorySize, canSaveSnapshot } from "@/lib/history-utils";

const generateComponentId = (
  component: FormComponentModel,
  components: FormComponentModel[]
): string => {
  const existingTypes = components.filter((comp) =>
    comp.getField("type").startsWith(component.getField("type"))
  );

  let counter = existingTypes.length;
  let newId = `${component.getField("id")}-${counter}`;

  return newId;
};

// History management functions
const createSnapshot = (components: FormComponentModel[], formTitle: string, formId: string | null): HistorySnapshot => ({
  components: components.map(comp => new FormComponentModel({ ...comp })),
  formTitle,
  formId,
  timestamp: Date.now()
});

const initializeHistory = (subscriptionInfo?: SubscriptionInfo | null): HistoryState => ({
  snapshots: [],
  currentIndex: -1,
  maxHistorySize: subscriptionInfo ? getHistorySize(subscriptionInfo) : DEFAULT_HISTORY_SIZE
});

// Template loading function
const loadTemplate = async (templateName: string, templateKey?: string): Promise<TemplateData | null> => {
  try {    
    const response = await fetch(`/templates/${templateName}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load template: ${templateName} - Status: ${response.status}`);
    }
    
    const templateData = await response.json();
    
    // If templateKey is provided, look for that specific template within the file
    const template = templateKey ? templateData[templateKey] : Object.values(templateData)[0];
    
    if (!template || !template.components) {
      throw new Error(`Template not found: ${templateKey || 'default'} in ${templateName}.json`);
    }
        
    // Convert template components to FormComponentModel instances
    const components = template.components.map((component: any) => {
      return new FormComponentModel(component);
    });
    
    return {
      components,
      formTitle: template.formTitle,
      formDescription: template.formDescription,
      tags: template.tags,
      category: template.category
    };
  } catch (error) {
    console.error('Error loading template:', (error as Error).message);
    throw error;
  }
};

export const useFormBuilderStore = create<FormBuilderStore>()(
  persist(
    (set, get) => ({
      mode: "editor",
      components: [],
      selectedRow: null,
      selectedComponent: null,
      viewport: "sm",
      showJson: false,
      formId: null,
      formTitle: "",
      loadedTemplateId: null,
      loadedTemplate: null,
      editor: null,
      enableDragging: true,
      history: initializeHistory(),
      subscriptionInfo: null,
      currentTheme: null,
      themes: [],
      updateMode: (mode: FormBuilderStore['mode']) => set({ mode }),
      updateViewport: (viewport: Viewports) => set({ viewport }),
      toggleJsonPreview: () => set((state) => ({ showJson: !state.showJson })),
      updateFormTitle: (title: string) => set({ formTitle: title }),
      updateFormId: (id: string) => set({ formId: id }),
      updateEnableDragging: (enableDragging: boolean) =>
        set({ enableDragging }),
      setEditor: (editor: Editor | null) => set({ editor }),
      addComponent: (component: FormComponentModel) => {
        const newComponent = new FormComponentModel({ ...component });
        let newId = generateComponentId(newComponent, get().components);
        newComponent.id = newId;
        newComponent.attributes = {
          ...newComponent.attributes,
          id: newComponent.id,
        };
        set((state) => {
          return { components: [...state.components, newComponent] };
        });

        // Save snapshot after adding component
        get().saveSnapshot();
        return newComponent;
      },
      removeComponent: (componentId: string) => {
        set((state) => {
          return {
            components: state.components.filter(
              (component) => component.id !== componentId
            ),
            selectedComponent: state.selectedComponent?.id === componentId ? null : state.selectedComponent,
          };
        });
        
        // Save snapshot after removing component
        get().saveSnapshot();
      },
      updateComponent: (
        componentId: string,
        field: string,
        value: any,
        isValidForAllViewports: boolean = false,
        isDragging: boolean = false
      ) => {
        set((state) => {
          const updateNestedField = (
            obj: any,
            path: string[],
            value: any
          ): any => {
            if (path.length === 1) {
              return { ...obj, [path[0]]: value };
            }
            const [current, ...rest] = path;
            return {
              ...obj,
              [current]: updateNestedField(obj[current] || {}, rest, value),
            };
          };

          const fieldPath = field.split(".");
          const viewport = state.viewport;
          let updatedComponent = null;

          return {
            components: state.components.map((component) => {
              if (component.id !== componentId) return component;

              updatedComponent = component;

              // If viewport is not 'sm', update the overrides
              if (viewport !== "sm" && !isValidForAllViewports) {
                const overrides =
                  component.overrides || ({} as Record<Viewports, any>);
                const viewportOverrides = overrides[viewport] || {};

                updatedComponent = new FormComponentModel({
                  ...component,
                  overrides: {
                    ...overrides,
                    [viewport]: updateNestedField(
                      viewportOverrides,
                      fieldPath,
                      value
                    ),
                  },
                });
                return updatedComponent;
              }

              // For 'sm' viewport, update the base component

              const nestedField = updateNestedField(
                component,
                fieldPath,
                value
              );

              updatedComponent = new FormComponentModel({
                ...component,
                ...nestedField,
              });
              return updatedComponent;
            }),
            selectedComponent: isDragging ? null : updatedComponent,
          };
        });

        // Save snapshot after updating component (only when not dragging)
        if (!isDragging) {
          get().saveSnapshot();
        }
      },
      updateComponents: (components: FormComponentModel[]) => {
        set({ components });
        // Save snapshot after updating components
        get().saveSnapshot();
      },
      selectComponent: (component: FormComponentModel | null) =>
        set(() => {
          return {
            selectedComponent: component
              ? new FormComponentModel(component)
              : null,
            editor: component === null || component.category === "form" ? null : get().editor,
          };
        }),
      moveComponent: (oldIndex: number, newIndex: number) => {
        set((state) => {
          const components = [...state.components];

          if (oldIndex === undefined) {
            oldIndex = components.length - 1;
          }

          const [movedComponent] = components.splice(oldIndex, 1);
          components.splice(newIndex, 0, movedComponent);

          return { components, selectedComponent: null };
        });
        
        // Save snapshot after moving component
        get().saveSnapshot();
      },
      duplicateComponent: (componentId: string) => {
        const state = get();
        const componentToDuplicate = state.components.find(comp => comp.id === componentId);
        
        if (!componentToDuplicate) {
          console.warn(`Component with id ${componentId} not found for duplication`);
          return;
        }

        // Create a deep copy of the component
        const duplicatedComponent = new FormComponentModel({ ...componentToDuplicate });
        
        // Generate a new unique ID
        const newId = generateComponentId(duplicatedComponent, state.components);
        duplicatedComponent.id = newId;
        duplicatedComponent.attributes = {
          ...duplicatedComponent.attributes,
          id: duplicatedComponent.id,
        };

        // Add the duplicated component to the form
        set((state) => ({
          components: [...state.components, duplicatedComponent],
          selectedComponent: duplicatedComponent, // Select the newly duplicated component
        }));
        
        // Save snapshot after duplicating component
        get().saveSnapshot();
      },
      loadTemplate: async (templateName: string, templateKey?: string) => {
        const templateData = await loadTemplate(templateName, templateKey);
        if (templateData) {
          set({
            components: templateData.components,
            formTitle: templateData.formTitle,
            selectedComponent: null,
            mode: "editor",
            loadedTemplateId: templateKey || null,
            loadedTemplate: templateData
          });
          
          // Clear history and save initial snapshot when loading template
          get().clearHistory();
          get().saveSnapshot();
          return true;
        }
        return false;
      },
      clearForm: () => {
        set({
          components: [],
          selectedComponent: null,
          mode: "editor",
          loadedTemplateId: null,
          loadedTemplate: null
        });
        
        // Clear history and save initial snapshot when clearing form
        get().clearHistory();
        get().saveSnapshot();
      },
      // History methods
      saveSnapshot: () => {
        const state = get();
        const snapshot = createSnapshot(state.components, state.formTitle, state.formId);
        
        set((state) => {
          const newHistory = { ...state.history };
          
          // Check if we can save a new snapshot based on subscription limits
          if (state.subscriptionInfo && !canSaveSnapshot(newHistory.snapshots.length, state.subscriptionInfo)) {
            // If we can't save a new snapshot, remove the oldest one to make room
            if (newHistory.snapshots.length > 0) {
              newHistory.snapshots = newHistory.snapshots.slice(0, -1);
              newHistory.currentIndex = Math.max(0, newHistory.currentIndex - 1);
            }
          }
          
          // Remove any snapshots after current index (when branching)
          newHistory.snapshots = newHistory.snapshots.slice(newHistory.currentIndex);
          
          // Add new snapshot to the beginning (newest first)
          newHistory.snapshots.unshift(snapshot);
          newHistory.currentIndex = 0;
          
          // Update max history size based on current subscription
          if (state.subscriptionInfo) {
            newHistory.maxHistorySize = getHistorySize(state.subscriptionInfo);
          }
          
          // Limit history size (fallback for non-subscription users)
          if (newHistory.snapshots.length > newHistory.maxHistorySize) {
            newHistory.snapshots = newHistory.snapshots.slice(0, newHistory.maxHistorySize);
            // currentIndex remains 0 since we're keeping the newest snapshots
          }
          
          return { history: newHistory };
        });
      },
      undo: () => {
        const state = get();
        if (state.history.currentIndex < state.history.snapshots.length - 1) {
          const newIndex = state.history.currentIndex + 1;
          const snapshot = state.history.snapshots[newIndex];
          
          set({
            components: snapshot.components.map(comp => new FormComponentModel({ ...comp })),
            formTitle: snapshot.formTitle,
            formId: snapshot.formId,
            selectedComponent: null,
            history: {
              ...state.history,
              currentIndex: newIndex
            }
          });
          return true;
        }
        return false;
      },
      redo: () => {
        const state = get();
        if (state.history.currentIndex > 0) {
          const newIndex = state.history.currentIndex - 1;
          const snapshot = state.history.snapshots[newIndex];
          
          set({
            components: snapshot.components.map(comp => new FormComponentModel({ ...comp })),
            formTitle: snapshot.formTitle,
            formId: snapshot.formId,
            selectedComponent: null,
            history: {
              ...state.history,
              currentIndex: newIndex
            }
          });
          return true;
        }
        return false;
      },
      canUndo: () => {
        const state = get();
        return state.history.currentIndex < state.history.snapshots.length - 1;
      },
      canRedo: () => {
        const state = get();
        return state.history.currentIndex > 0;
      },
      clearHistory: () => {
        const state = get();
        set({
          history: initializeHistory(state.subscriptionInfo)
        });
      },
      jumpToSnapshot: (index: number) => {
        const state = get();
        if (index >= 0 && index < state.history.snapshots.length) {
          const snapshot = state.history.snapshots[index];
          
          set({
            components: snapshot.components.map(comp => new FormComponentModel({ ...comp })),
            formTitle: snapshot.formTitle,
            formId: snapshot.formId,
            selectedComponent: null,
            history: {
              ...state.history,
              currentIndex: index
            }
          });
          return true;
        }
        return false;
      },
      // Subscription methods
      updateSubscriptionInfo: (subscriptionInfo: SubscriptionInfo) => {
        set((state) => {
          const newHistory = { ...state.history };
          newHistory.maxHistorySize = getHistorySize(subscriptionInfo);
          
          // If the new limit is smaller than current history, trim it
          if (newHistory.snapshots.length > newHistory.maxHistorySize) {
            newHistory.snapshots = newHistory.snapshots.slice(-newHistory.maxHistorySize);
            newHistory.currentIndex = Math.min(newHistory.currentIndex, newHistory.snapshots.length - 1);
          }
          
          return {
            subscriptionInfo,
            history: newHistory
          };
        });
      },
      // Theme methods
      setCurrentTheme: (css: string | null) => set({ currentTheme: css }),
      clearTheme: () => set({ currentTheme: null }),
      updateThemes: (themes: FormBuilderStore['themes']) => set({ themes }),
    }),
    {
      name: "form-builder-storage",
      partialize: (state) => ({
        currentTheme: state.currentTheme,
      }),
    }
  )
);
