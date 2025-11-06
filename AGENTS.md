# AGENTS.md - Shadcn Builder Project Guide

This document provides comprehensive information for AI agents working with the Shadcn Builder codebase.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture Overview](#architecture-overview)
3. [Project Structure](#project-structure)
4. [Key Concepts](#key-concepts)
5. [State Management](#state-management)
6. [Component System](#component-system)
7. [Template System](#template-system)
8. [Code Generation](#code-generation)
9. [Authentication & Subscriptions](#authentication--subscriptions)
10. [Development Guidelines](#development-guidelines)
11. [Common Tasks](#common-tasks)
12. [File Reference](#file-reference)

---

## Project Overview

**Shadcn Builder** is a no-code visual form builder that allows users to create forms using drag-and-drop interface and export production-ready React + TypeScript code using shadcn/ui components.

### Key Features
- Drag-and-drop form builder interface
- Live preview with responsive viewports (mobile, tablet, desktop)
- Export production-ready React + TypeScript code
- Template system with pre-built form templates
- User authentication and form saving
- Undo/redo history with subscription-based limits
- Custom theme system
- Grid-based layout with column spanning

### Tech Stack
- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui components
- **State**: Zustand with persistence
- **Backend**: Convex (database, real-time)
- **Authentication**: Clerk
- **Drag & Drop**: @dnd-kit
- **Form Handling**: react-hook-form, Zod validation
- **Rich Text**: TipTap
- **Analytics**: PostHog, Vercel Analytics

---

## Architecture Overview

### Core Architecture Patterns

1. **Component-Based Architecture**: All form components follow a consistent pattern with:
   - Render function for canvas display
   - Code generation function for export
   - Design properties configuration

2. **State Management**: Centralized Zustand store with:
   - Immutable updates using FormComponentModel instances
   - Snapshot-based history system
   - Viewport-specific overrides support

3. **Responsive Design**: Viewport-aware system where:
   - Base styles apply to `sm` viewport
   - `md` and `lg` viewports use overrides
   - Desktop (`lg`) falls back to `md` if `lg` override doesn't exist

4. **Code Generation**: Transform FormComponentModel instances into:
   - React component code
   - Zod validation schemas
   - Required dependencies list
   - Proper imports

---

## Project Structure

```
form-builder/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── builder/                  # Main form builder page
│   │   │   ├── layout.tsx            # Builder layout
│   │   │   └── page.tsx             # Builder main component
│   │   ├── template/[category]/[key]/ # Template preview pages
│   │   ├── sign-in/[[...sign-in]]/  # Clerk sign-in
│   │   └── sign-up/[[...sign-up]]/  # Clerk sign-up
│   │
│   ├── components/
│   │   ├── form-builder/             # Core builder components
│   │   │   ├── canvas/               # Drag-drop canvas
│   │   │   │   ├── generate-canvas-grid.tsx
│   │   │   │   └── sortable-row.tsx
│   │   │   ├── dialogs/              # Various dialogs
│   │   │   │   ├── generate-code-dialog.tsx
│   │   │   │   ├── save-form-dialog.tsx
│   │   │   │   ├── load-form-dialog.tsx
│   │   │   │   ├── load-template-dialog.tsx
│   │   │   │   ├── manage-themes-dialog.tsx
│   │   │   │   └── theme-config-dialog.tsx
│   │   │   ├── form-components/     # Form field components
│   │   │   │   ├── form-input.tsx
│   │   │   │   ├── form-textarea.tsx
│   │   │   │   ├── form-select.tsx
│   │   │   │   └── ... (other form components)
│   │   │   ├── sidebar/              # Left/right sidebars
│   │   │   │   ├── sidebarLeft.tsx   # Component palette
│   │   │   │   ├── sidebarRight.tsx # Property editor
│   │   │   │   └── groups/           # Property groups
│   │   │   ├── helpers/              # Helper functions
│   │   │   │   ├── generate-react-code.tsx
│   │   │   │   └── generate-json.ts
│   │   │   └── mainCanvas.tsx        # Main canvas component
│   │   ├── landingpage/              # Marketing pages
│   │   └── ui/                       # shadcn/ui components
│   │
│   ├── stores/
│   │   └── form-builder-store.ts     # Zustand store (main state)
│   │
│   ├── hooks/
│   │   ├── use-auth.ts               # Authentication hook
│   │   ├── use-history.ts            # Undo/redo hook
│   │   ├── use-save-form.ts          # Save form hook
│   │   ├── use-saved-forms.ts        # Load forms hook
│   │   └── use-themes.ts             # Theme management hook
│   │
│   ├── models/
│   │   └── FormComponent.ts          # FormComponentModel class
│   │
│   ├── types/
│   │   ├── form-builder.types.ts     # Main types
│   │   ├── FormComponent.types.ts     # Component types
│   │   └── subscription.types.ts      # Subscription types
│   │
│   ├── lib/
│   │   ├── utils.ts                  # Utility functions
│   │   ├── history-utils.ts          # History utilities
│   │   └── subscription.ts           # Subscription utilities
│   │
│   ├── config/
│   │   └── available-components.ts   # Component registry
│   │
│   └── providers/
│       ├── ConvexClientProvider.tsx
│       ├── PostHogProvider.tsx
│       └── SubscriptionProvider.tsx
│
├── convex/                            # Backend (Convex)
│   ├── schema.ts                      # Database schema
│   ├── forms.ts                       # Form CRUD operations
│   ├── themes.ts                      # Theme management
│   └── auth.config.ts                 # Auth configuration
│
└── public/
    └── templates/                     # Template JSON files
        ├── business.json
        ├── e-commerce.json
        ├── healthcare.json
        └── ... (other templates)
```

---

## Key Concepts

### FormComponentModel

The core data structure representing a form component. Located in `src/models/FormComponent.ts`.

**Key Properties:**
- `id`: Unique identifier
- `type`: Component type (input, textarea, select, etc.)
- `category`: "form" or "content"
- `label`: Display label
- `properties`: Style and configuration properties
- `attributes`: HTML attributes
- `overrides`: Viewport-specific overrides (md, lg)
- `validations`: Zod validation rules

**Key Methods:**
- `getField(field, viewport?)`: Get field value with viewport override support
- `getTWClasses(styleKey)`: Generate Tailwind classes for all viewports
- `toJSON()`: Serialize to JSON

**Example:**
```typescript
const component = new FormComponentModel({
  id: "input-1",
  type: "input",
  category: "form",
  label: "Email",
  properties: {
    style: {
      colSpan: "12",
      labelPosition: "top"
    }
  },
  attributes: {
    type: "email",
    placeholder: "Enter email"
  }
});

// Get field with viewport override
const colSpan = component.getField("properties.style.colSpan", "md");
```

### Viewport System

The project supports three viewports:
- `sm`: Mobile (default/base)
- `md`: Tablet (3xl breakpoint)
- `lg`: Desktop (5xl breakpoint)

**How Overrides Work:**
1. Base properties are stored on the component
2. Viewport-specific overrides are in `component.overrides[viewport]`
3. When accessing fields, `getField()` checks overrides first
4. Desktop falls back to tablet if desktop override doesn't exist

**Example:**
```typescript
component.overrides = {
  md: {
    properties: {
      style: {
        colSpan: "6"  // Tablet: half width
      }
    }
  },
  lg: {
    properties: {
      style: {
        colSpan: "4"  // Desktop: one-third width
      }
    }
  }
};
```

### Grid System

Components are arranged in a grid system:
- 12-column grid
- Components can span multiple columns (`colSpan`)
- Components can start at specific columns (`colStart`)
- Components are grouped into rows automatically
- Column spans are recalculated when dragging components

---

## State Management

### Zustand Store

The main state is managed by `useFormBuilderStore` in `src/stores/form-builder-store.ts`.

**Key State:**
- `components`: Array of FormComponentModel instances
- `selectedComponent`: Currently selected component (null when none)
- `mode`: "editor" | "editor-preview" | "preview" | "export"
- `viewport`: "sm" | "md" | "lg"
- `formTitle`: Form title
- `formId`: Saved form ID (null if not saved)
- `history`: Undo/redo history state
- `subscriptionInfo`: User subscription information
- `currentTheme`: Active theme CSS
- `themes`: Array of user themes

**Key Actions:**
- `addComponent(component)`: Add new component
- `removeComponent(componentId)`: Remove component
- `updateComponent(componentId, field, value, isValidForAllViewports?, isDragging?)`: Update component property
- `moveComponent(oldIndex, newIndex)`: Reorder components
- `duplicateComponent(componentId)`: Duplicate component
- `selectComponent(component)`: Select/deselect component
- `loadTemplate(name, key?)`: Load template
- `saveSnapshot()`: Save history snapshot
- `undo()` / `redo()`: Undo/redo operations

**Important Patterns:**
1. Always create new FormComponentModel instances (immutability)
2. History snapshots are saved automatically after mutations
3. Use `isDragging` flag to prevent snapshots during drag operations
4. Use `isValidForAllViewports` to update base properties when viewport !== "sm"

**Example:**
```typescript
// Update component property
updateComponent(
  "input-1",
  "properties.style.colSpan",
  "6",
  false,  // Not valid for all viewports (viewport-specific)
  false   // Not dragging
);

// Update for all viewports
updateComponent(
  "input-1",
  "label",
  "New Label",
  true,   // Valid for all viewports
  false
);
```

### History System

The undo/redo system uses snapshots:
- Each snapshot contains: components array, formTitle, formId, timestamp
- Snapshots are stored in reverse chronological order (newest first)
- Current index tracks position in history
- Subscription determines max history size

**History Limits:**
- Free: 5 snapshots
- Advanced: 20 snapshots
- Pro: Unlimited

**Usage:**
```typescript
const { undo, redo, canUndo, canRedo } = useHistory();

if (canUndo) {
  undo(); // Go back one step
}
```

---

## Component System

### Component Structure

Each form component follows this pattern:

1. **Render Function**: Renders component in canvas
   ```typescript
   export function FormInput(
     component: FormComponentModel,
     form: UseFormReturn,
     field: ControllerRenderProps
   ) {
     // Render logic
   }
   ```

2. **Code Generation Function**: Generates React code for export
   ```typescript
   export function getReactCode(component: FormComponentModel): ReactCode {
     return {
       template: "...",  // JSX template
       logic: "...",      // Optional logic code
       dependencies: {   // Required imports
         "@/components/ui/input": ["Input"]
       },
       thirdPartyDependencies: ["date-fns"]  // Optional
     };
   }
   ```

3. **Design Properties**: Property editor configuration
   ```typescript
   export const InputDesignProperties: DesignPropertiesViews = {
     base: <BaseProperties />,
     grid: <GridProperties />,
     input: <InputProperties />,
     // ...
   };
   ```

### Component Registry

Components are registered in `src/config/available-components.ts`:

```typescript
export const AVAILABLE_COMPONENTS: SelectableComponents[] = [
  {
    id: "input",
    label: "Input",
    type: "input",
    icon: "Type"
  },
  // ...
];

export function getComponentReactCode(component: FormComponentModel): ReactCode {
  switch (component.type) {
    case "input":
      return getReactCodeInput(component);
    // ...
  }
}
```

### Adding New Components

To add a new component:

1. Create component file in `src/components/form-builder/form-components/`
2. Implement render function and code generation function
3. Create design properties configuration
4. Register in `available-components.ts`
5. Add to component registry switch statement

---

## Template System

### Template Structure

Templates are JSON files in `public/templates/` with this structure:

```json
{
  "template-key": {
    "formTitle": "Template Name",
    "formDescription": "Description",
    "category": "business",
    "tags": ["tag1", "tag2"],
    "components": [
      {
        "id": "input-1",
        "type": "input",
        "label": "Email",
        // ... component properties
      }
    ]
  }
}
```

### Loading Templates

Templates are loaded via:
```typescript
await loadTemplate("business", "account-deletion");
```

The system:
1. Fetches `/templates/business.json`
2. Extracts the specific template by key
3. Converts JSON to FormComponentModel instances
4. Updates store with template data
5. Clears history and saves initial snapshot

### Template Code Generation

Templates can also generate TypeScript React components:
- Generated files stored in `public/templates/code/`
- Generated via `scripts/generate-template-code.ts`
- Used for template preview pages

---

## Code Generation

### Code Generation Process

The code generation system (`src/components/form-builder/helpers/generate-react-code.tsx`) transforms FormComponentModel instances into production-ready React code.

**Process:**
1. Generate component JSX for each component
2. Collect all dependencies
3. Generate imports
4. Generate Zod schema
5. Generate form component with react-hook-form
6. Format with Prettier

**Output Structure:**
```typescript
import { ... } from "...";

const schema = z.object({ ... });

export function GeneratedForm() {
  const form = useForm({ ... });
  
  return (
    <form onSubmit={...}>
      {/* Generated component JSX */}
    </form>
  );
}
```

### Dependencies Collection

The system automatically collects:
- shadcn/ui component imports
- Third-party dependencies (date-fns, etc.)
- Required utilities

**Output includes:**
- shadcn installation command
- Third-party dependency installation command
- Complete React component code

---

## Authentication & Subscriptions

### Authentication (Clerk)

Authentication is handled via Clerk:
- Sign in: `/sign-in`
- Sign up: `/sign-up`
- Protected routes require authentication
- User state accessed via `useAuthState()` hook

**Usage:**
```typescript
const { isSignedIn, user, isLoading, subscriptionInfo } = useAuthState();
```

### Subscription System

Subscription tiers are stored in Clerk's `publicMetadata`:
- `free`: 5 history snapshots
- `advanced`: 20 history snapshots
- `pro`: Unlimited history snapshots

**Subscription Info Structure:**
```typescript
interface SubscriptionInfo {
  tier: "free" | "advanced" | "pro";
  historySize: number;
  isUnlimited: boolean;
}
```

**Accessing Subscription:**
```typescript
const subscriptionInfo = useAuthState().subscriptionInfo;
```

The store automatically respects subscription limits when saving snapshots.

---

## Development Guidelines

### Code Style

1. **TypeScript**: Strict typing, prefer interfaces over types
2. **Naming**: PascalCase for components, camelCase for functions/variables
3. **Components**: Use React.memo for performance when appropriate
4. **Hooks**: Create custom hooks for reusable logic
5. **Imports**: Use path aliases (`@/components/...`)

### Component Patterns

**Form Component Pattern:**
```typescript
// 1. Render function
export function FormComponent(
  component: FormComponentModel,
  form: UseFormReturn,
  field: ControllerRenderProps
) {
  // Access properties
  const value = component.getField("properties.style.colSpan");
  
  // Render component
  return <Component {...field} />;
}

// 2. Code generation
export function getReactCode(component: FormComponentModel): ReactCode {
  return {
    template: `...`,
    dependencies: { ... }
  };
}

// 3. Design properties
export const ComponentDesignProperties: DesignPropertiesViews = {
  base: <BaseGroup />,
  // ...
};
```

### State Updates

**Always:**
- Create new FormComponentModel instances
- Use store actions, don't mutate directly
- Save snapshots after mutations (automatic)
- Use `updateComponent` for property updates

**Viewport Updates:**
```typescript
// Update for current viewport only
updateComponent(id, field, value, false);

// Update for all viewports
updateComponent(id, field, value, true);
```

### Drag & Drop

Drag and drop uses `@dnd-kit`:
- Components are draggable from sidebar
- Canvas has drop zones
- Grid system auto-adjusts column spans
- Drag operations don't save snapshots (use `isDragging: true`)

---

## Common Tasks

### Adding a New Form Component

1. Create component file: `src/components/form-builder/form-components/form-new-component.tsx`
2. Implement render function
3. Implement `getReactCode` function
4. Create design properties
5. Register in `available-components.ts`
6. Add to component registry

### Modifying Component Properties

1. Identify property path (e.g., `properties.style.colSpan`)
2. Update via `updateComponent(componentId, path, value)`
3. Consider viewport scope (all viewports or current only)

### Adding a New Template

1. Create JSON file in `public/templates/`
2. Structure template with components array
3. Add to template loading dialog
4. Optionally generate TypeScript code for preview

### Working with History

```typescript
// Access history
const { undo, redo, canUndo, canRedo, snapshots } = useHistory();

// Save snapshot manually (usually automatic)
saveSnapshot();

// Jump to specific snapshot
jumpToSnapshot(index);
```

### Working with Themes

```typescript
// Access themes
const { themes, currentTheme, setCurrentTheme } = useThemes();

// Apply theme
setCurrentTheme(cssString);

// Clear theme
clearTheme();
```

### Saving/Loading Forms

```typescript
// Save form
const { saveForm, isSaving } = useSaveForm();
await saveForm(formData);

// Load forms
const { savedForms, loadForm } = useSavedForms();
await loadForm(formId);
```

---

## File Reference

### Critical Files

**State Management:**
- `src/stores/form-builder-store.ts` - Main Zustand store

**Core Models:**
- `src/models/FormComponent.ts` - FormComponentModel class

**Types:**
- `src/types/form-builder.types.ts` - Main type definitions
- `src/types/FormComponent.types.ts` - Component types

**Utilities:**
- `src/lib/utils.ts` - General utilities (cn, Tailwind class generation)
- `src/lib/history-utils.ts` - History management utilities
- `src/lib/subscription.ts` - Subscription utilities

**Hooks:**
- `src/hooks/use-auth.ts` - Authentication
- `src/hooks/use-history.ts` - Undo/redo
- `src/hooks/use-save-form.ts` - Save forms
- `src/hooks/use-saved-forms.ts` - Load forms
- `src/hooks/use-themes.ts` - Theme management

**Components:**
- `src/components/form-builder/mainCanvas.tsx` - Main canvas
- `src/components/form-builder/sidebar/sidebarLeft.tsx` - Component palette
- `src/components/form-builder/sidebar/sidebarRight.tsx` - Property editor

**Backend:**
- `convex/schema.ts` - Database schema
- `convex/forms.ts` - Form CRUD operations
- `convex/themes.ts` - Theme operations

**Configuration:**
- `src/config/available-components.ts` - Component registry

### Important Patterns

1. **Component Access Pattern:**
   ```typescript
   const component = useFormBuilderStore(state => state.components)
     .find(c => c.id === componentId);
   ```

2. **Property Update Pattern:**
   ```typescript
   updateComponent(componentId, "properties.style.colSpan", "6");
   ```

3. **Viewport-Aware Access:**
   ```typescript
   const viewport = useFormBuilderStore(state => state.viewport);
   const value = component.getField("properties.style.colSpan", viewport);
   ```

4. **History Management:**
   ```typescript
   // Snapshots saved automatically after mutations
   // Use useHistory hook for undo/redo UI
   ```

---

## Additional Notes

### Performance Considerations

- Components use React.memo where appropriate
- Store selectors are split to minimize re-renders
- History snapshots use deep cloning of components
- Grid calculations are memoized

### Testing

- History system has unit tests (`src/hooks/__tests__/use-history.test.ts`)
- Component tests should test render and code generation

### Deployment

- Build includes template code generation
- Convex deployment handles backend
- Environment variables required for Clerk and Convex

---

This guide should help AI agents understand and work effectively with the Shadcn Builder codebase. For specific implementation details, refer to the referenced files.
