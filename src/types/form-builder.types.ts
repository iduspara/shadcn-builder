import { FormComponentModel } from "@/components/form-builder/Models/FormComponent";
import * as Icons from "lucide-react";
import { HTMLAttributes, HTMLInputTypeAttribute } from 'react';

export type SelectableComponents = {
  id: string;
  label: string;
  type: string;
  icon: keyof typeof Icons;
};

export type Viewports = 'sm' | 'md' | 'lg';

export type DesignPropertiesViews = {
  base: React.ReactNode;
  grid: React.ReactNode;
  html: React.ReactNode;
  label: React.ReactNode;
  input: React.ReactNode;
  button: React.ReactNode;
  options: React.ReactNode;
};

export type ReactCode = {
  code: string;
  dependencies: Record<string, string[]>;
};

export type ComponentViews = {
  render: React.ReactNode;
  renderDesignProperties: DesignPropertiesViews;
  reactCode: ReactCode;
};

export interface FormRow {
  id: number;
  components: FormComponentModel[];
}

export interface FormBuilderStore {
  mode: 'editor' | 'preview';
  viewport: Viewports;
  showJson: boolean;
  formTitle: string;
  updateMode: (mode: 'editor' | 'preview') => void;
  updateViewport: (viewport: Viewports) => void;
  toggleJsonPreview: () => void;
  updateFormTitle: (title: string) => void;
  rows: FormRow[];
  selectedComponent: FormComponentModel | null;
  selectedRow: FormRow | null;
  addRow: (component: FormComponentModel, after?: number, before?: number) => void;
  removeRow: (rowId: number) => void;
  updateRows: (rows: FormRow[]) => void;
  updateRow: (row: FormRow) => void;
  addComponent: (rowId: number, component: FormComponentModel, before?: number, after?: number) => void;
  removeComponent: (rowId: number, componentId: string) => void;
  updateComponent: (componentId: string, field: string, value: any, isValidForAllViewports?: boolean) => void;
  selectComponent: (component: FormComponentModel | null) => void;
  getComponentFieldValue: (component: FormComponentModel, field: string) => any;
  selectRow: (row: FormRow | null) => void;
} 
