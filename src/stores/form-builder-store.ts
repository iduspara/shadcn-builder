import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FormBuilderStore, FormRow, Viewports } from '@/types/form-builder.types';
import { AVAILABLE_COMPONENTS } from '@/config/available-components';
import { FormComponentModel } from '@/components/form-builder/Models/FormComponent';

const generateComponentId = (component: FormComponentModel, rows: FormRow[]): string => {
  const existingComponents = rows.flatMap(row => row.components);
  const existingTypes = existingComponents.filter(comp => comp.getField("type").startsWith(component.getField("type")));

  console.log(existingTypes);

  let counter = existingTypes.length;
  let newId = `${component.getField("id")}-${counter}`;

  return newId;
};

export const useFormBuilderStore = create<FormBuilderStore>()(
  persist(
    (set, get) => ({
      mode: 'editor',
      rows: [],
      selectedRow: null,
      selectedComponent: null,    
      viewport: 'sm',
      showJson: false,
      formTitle: 'generatedForm',
      updateMode: (mode: 'editor' | 'preview') => set({ mode }),
      updateViewport: (viewport: Viewports) => set({ viewport }),
      toggleJsonPreview: () => set((state) => ({ showJson: !state.showJson })),
      updateFormTitle: (title: string) => set({ formTitle: title }),
      addRow: (component: FormComponentModel, after?: number, before?: number) => 
        set((state) => {
          const newComponent = new FormComponentModel({...component});
          newComponent.id = generateComponentId(newComponent, state.rows);
          newComponent.attributes = {
            ...newComponent.attributes,
            id: newComponent.id
          };
          
          const newRow = { id: state.rows.length + 1, components: [newComponent] };

          if (after !== undefined) {
            const updatedRows = [...state.rows.slice(0, after), newRow, ...state.rows.slice(after)];
            return { rows: updatedRows.map((row, index) => ({ ...row, id: index + 1 })) };
          }

          if (before !== undefined) {
            const updatedRows = [...state.rows.slice(0, before - 1), newRow, ...state.rows.slice(before - 1)];
            return { rows: updatedRows.map((row, index) => ({ ...row, id: index + 1 })) };
          }

          return { rows: [...state.rows, newRow] };
        }),

      removeRow: (rowId: number) => {
        set((state) => ({
          rows: state.rows.filter((row) => row.id !== rowId),
        }));
      },
      updateRows: (rows: FormRow[]) => set({ rows }), 
      updateRow: (row: FormRow) => set((state) => ({
        rows: state.rows.map((r) => r.id === row.id ? row : r)
      })),
      selectRow: (row: FormRow | null) => set(() => ({ selectedRow: row, selectedComponent: null })),
      addComponent: (rowId: number, component: FormComponentModel, before?: number, after?: number) => {
        set((state) => {
          const newComponent = new FormComponentModel({...component});
          newComponent.id = generateComponentId(newComponent, state.rows);
          newComponent.attributes = {
            ...newComponent.attributes,
            id: newComponent.id
          };

          if (state.rows.length === 0) {
            return {
              rows: [{ id: 0, components: [newComponent] }]
            };
          }

          if (after !== undefined) {
            return {
              rows: state.rows.map((row) => 
                row.id === rowId 
                  ? { ...row, components: [...row.components.slice(0, after + 1), newComponent, ...row.components.slice(after + 1)] }
                  : row
              ),
            };
          }

          if (before !== undefined) {
            return {
              rows: state.rows.map((row) =>
                row.id === rowId
                  ? { ...row, components: [...row.components.slice(0, before), newComponent, ...row.components.slice(before)] }
                  : row
              ),
            };
          }

          return {  
            rows: state.rows.map((row) => 
              row.id === rowId 
                ? { ...row, components: [...row.components, newComponent] } 
                : row
            ),
          };
        });
      },
      removeComponent: (rowId: number, componentId: string) => {
        set((state) => {
          const row = state.rows.find((r) => r.id === rowId);
          if (!row) return state;

          // If this is the last component in the row, remove the entire row
          if (row.components.length === 1) {
            return {
              rows: state.rows.filter((r) => r.id !== rowId)
            };
          }

          // Otherwise just remove the component
          return {
            rows: state.rows.map((r) => 
              r.id === rowId 
                ? { ...r, components: r.components.filter((c) => c.id !== componentId) }
                : r
            )
          };
        });
      },
      updateComponent: (componentId: string, field: string, value: any, isValidForAllViewports: boolean = false) => {   
        set((state) => {
          const updateNestedField = (obj: any, path: string[], value: any): any => {
            if (path.length === 1) {
              return { ...obj, [path[0]]: value };
            }
            const [current, ...rest] = path;
            return {
              ...obj,
              [current]: updateNestedField(obj[current] || {}, rest, value)
            };
          };

          const fieldPath = field.split('.');
          const viewport = state.viewport;
          let updatedComponent = null;

          return {
            rows: state.rows.map((row) => ({
              ...row,
              components: row.components.map((component) => {
                if (component.id !== componentId) return component;

                updatedComponent = component;
                
                // If viewport is not 'sm', update the overrides
                if (viewport !== 'sm' && !isValidForAllViewports) {
                  const overrides = component.overrides || {} as Record<Viewports, any>;
                  const viewportOverrides = overrides[viewport] || {};
                  
                  updatedComponent = new FormComponentModel({
                    ...component,
                    overrides: {
                      ...overrides,
                      [viewport]: updateNestedField(viewportOverrides, fieldPath, value)
                    }
                  });

                  return updatedComponent;
                }
                
                // For 'sm' viewport, update the base component

                const nestedField = updateNestedField(component, fieldPath, value);

                updatedComponent = new FormComponentModel({
                  ...component,
                  ...nestedField
                });

                return updatedComponent;
              }),
            })),
            selectedComponent: updatedComponent,
          };
        });
      },
      selectComponent: (component: FormComponentModel | null) => set(() => ({ selectedComponent: component ? new FormComponentModel(component) : null, selectedRow: null })),
      getComponentFieldValue: (component: FormComponentModel, field: string) => {
        const state = get();

        const getNestedValue = (obj: any, path: string[]): any => {
          if (path.length === 0) return obj;
          const [current, ...rest] = path;
          return obj && typeof obj === 'object' ? getNestedValue(obj[current], rest) : undefined;
        };

        const fieldPath = field.split('.');
        
        if (component.overrides) {
          // Check Tablet override first
          if (state.viewport === 'md' && component.overrides['md']) {
            const overrideValueTablet = getNestedValue(component.overrides['md'], fieldPath);
            if (overrideValueTablet !== undefined) return overrideValueTablet;
          }

          // Check Desktop override first
          if (state.viewport === 'lg' && component.overrides?.[state.viewport]) {
            const overrideValueDesktop = getNestedValue(component.overrides['lg'], fieldPath);
            if (overrideValueDesktop !== undefined) return overrideValueDesktop;
          } else if (state.viewport === 'lg' && !component.overrides['lg'] && component.overrides['md']) {
            // If Desktop not exists use the Tablet as fallback
            const overrideValueDesktop = getNestedValue(component.overrides['md'], fieldPath);
            if (overrideValueDesktop !== undefined) return overrideValueDesktop;
          }
        }

        // Fall back to base component value
        return getNestedValue(component, fieldPath);
      },
    }),
    {
      name: 'form-builder-storage',
      partialize: (state) => ({ rows: state.rows, viewport: state.viewport, formTitle: state.formTitle }),
      onRehydrateStorage: () => (state) => {
        if (state?.rows) {

          state.rows = state.rows.map(row => ({
            ...row,
            components: row.components.map(component => {
              const matchingComponent = AVAILABLE_COMPONENTS.find(c => c.type === component.type);
              return new FormComponentModel(component);
            })
          }));
        }
      }
    }
  )
); 
