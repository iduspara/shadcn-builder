import { FormComponentModel } from "@/models/FormComponent";
import { Editor } from "@tiptap/react";
import { icons } from "lucide-react";
import { HTMLAttributes, HTMLInputTypeAttribute } from 'react';
import { SubscriptionInfo } from './subscription.types';

export type SelectableComponents = {
  id: string;
  label: string;
  type: string;
  icon: keyof typeof icons;
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
  validation: React.ReactNode;
};

export type ReactCode = {
  template: string;
  logic?: string;
  dependencies: Record<string, string[] | string>;  
  thirdPartyDependencies?: string[];
};

export type TemplateData = {
  components: FormComponentModel[];
  formTitle: string;
  formDescription: string;
  tags: string[];
  category: string;
};

export type HistorySnapshot = {
  components: FormComponentModel[];
  formTitle: string;
  formId: string | null;
  timestamp: number;
};

export type HistoryState = {
  snapshots: HistorySnapshot[];
  currentIndex: number;
  maxHistorySize: number;
};

export interface FormBuilderStore {
  mode: 'editor' | 'editor-preview' | 'preview' | 'export';
  viewport: Viewports;
  showJson: boolean;
  formId: string | null;
  formTitle: string;
  loadedTemplateId: string | null;
  loadedTemplate: TemplateData | null;
  editor: Editor | null;
  enableDragging: boolean;
  history: HistoryState;
  subscriptionInfo: SubscriptionInfo | null;
  updateMode: (mode: FormBuilderStore['mode']) => void;
  updateViewport: (viewport: Viewports) => void;
  toggleJsonPreview: () => void;
  updateFormTitle: (title: string) => void;
  updateFormId: (id: string) => void;
  setEditor: (editor: Editor | null) => void;
  components: FormComponentModel[];
  selectedComponent: FormComponentModel | null;
  updateEnableDragging: (enableDragging: boolean) => void;
  addComponent: (component: FormComponentModel) => void;
  removeComponent: (componentId: string) => void;
  updateComponent: (componentId: string, field: string, value: any, isValidForAllViewports?: boolean, isDragging?: boolean) => void;
  updateComponents: (components: FormComponentModel[]) => void;
  selectComponent: (component: FormComponentModel | null) => void;
  moveComponent: (oldIndex: number, newIndex: number) => void;
  duplicateComponent: (componentId: string) => void;
  loadTemplate: (templateName: string, templateKey?: string) => Promise<boolean>;
  clearForm: () => void;
  // History methods
  saveSnapshot: () => void;
  undo: () => boolean;
  redo: () => boolean;
  canUndo: () => boolean;
  canRedo: () => boolean;
  clearHistory: () => void;
  jumpToSnapshot: (index: number) => boolean;
  // Subscription methods
  updateSubscriptionInfo: (subscriptionInfo: SubscriptionInfo) => void;
  // Theme methods
  currentTheme: string | null;
  themes: Array<{
    _id: string;
    userId: string;
    name: string;
    css: string;
    isDefault: boolean;
    createdAt: number;
    updatedAt: number;
  }>;
  setCurrentTheme: (css: string | null) => void;
  clearTheme: () => void;
  updateThemes: (themes: FormBuilderStore['themes']) => void;
} 
