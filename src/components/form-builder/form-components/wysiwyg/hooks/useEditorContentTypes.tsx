import { Editor, useEditorState } from "@tiptap/react";
import { icons } from "lucide-react";

export type ContentTypeOption = {
  label: string;
  id: string;
  type: "option";
  disabled: () => boolean;
  isActive: () => boolean;
  onClick: () => void;
  icon: keyof typeof icons | null;
};

export type ContentTypeCategory = {
  label: string;
  id: string;
  type: "category";
};

export type ContentTypeOptions = Array<ContentTypeOption | ContentTypeCategory>;

export const useEditorContentTypes = (editor: Editor) => {
  return useEditorState({
    editor,
    selector: (ctx): ContentTypeOptions => [
      {
        type: "category",
        label: "Hierarchy",
        id: "hierarchy",
      },
      {
        icon: "Pilcrow",
        onClick: () =>
          ctx.editor
            .chain()
            .focus()
            .liftListItem("listItem")
            .setParagraph()
            .run(),
        id: "paragraph",
        disabled: () => !ctx.editor.can().setParagraph(),
        isActive: () =>
          ctx.editor.isActive("paragraph") &&
          !ctx.editor.isActive("orderedList") &&
          !ctx.editor.isActive("bulletList") &&
          !ctx.editor.isActive("taskList"),
        label: "Paragraph",
        type: "option",
      },
      {
        icon: "Heading1",
        onClick: () =>
          ctx.editor
            .chain()
            .focus()
            .liftListItem("listItem")
            .setHeading({ level: 1 })
            .run(),
        id: "heading1",
        disabled: () => !ctx.editor.can().setHeading({ level: 1 }),
        isActive: () => ctx.editor.isActive("heading", { level: 1 }),
        label: "Heading 1",
        type: "option",
      },
      {
        icon: "Heading2",
        onClick: () =>
          ctx.editor
            .chain()
            .focus()
            .liftListItem("listItem")
            .setHeading({ level: 2 })
            .run(),
        id: "heading2",
        disabled: () => !ctx.editor.can().setHeading({ level: 2 }),
        isActive: () => ctx.editor.isActive("heading", { level: 2 }),
        label: "Heading 2",
        type: "option",
      },
      {
        icon: "Heading3",
        onClick: () =>
          ctx.editor
            .chain()
            .focus()
            .liftListItem("listItem")
            .setHeading({ level: 3 })
            .run(),
        id: "heading3",
        disabled: () => !ctx.editor.can().setHeading({ level: 3 }),
        isActive: () => ctx.editor.isActive("heading", { level: 3 }),
        label: "Heading 3",
        type: "option",
      },
      {
        type: "category",
        label: "Lists",
        id: "lists",
      },
      {
        icon: "List",
        onClick: () => ctx.editor.chain().focus().toggleBulletList().run(),
        id: "bulletList",
        disabled: () => !ctx.editor.can().toggleBulletList(),
        isActive: () => ctx.editor.isActive("bulletList"),
        label: "Bullet list",
        type: "option",
      },
      {
        icon: "ListOrdered",
        onClick: () => ctx.editor.chain().focus().toggleOrderedList().run(),
        id: "orderedList",
        disabled: () => !ctx.editor.can().toggleOrderedList(),
        isActive: () => ctx.editor.isActive("orderedList"),
        label: "Numbered list",
        type: "option",
      },
      {
        type: "category",
        label: "Text Styles",
        id: "textStyle",
      },
      {
        icon: "ALargeSmall",
        onClick: () => {
          editor.chain().focus().unsetCustomClass().run();
        },
        id: "normal",
        disabled: () => false,
        isActive: () => {
          return !editor.isActive('textStyle')
        },
        label: 'Normal',
        type: "option",
      },
      {
        icon: "ALargeSmall",
        onClick: () => {
          editor.chain().focus().setCustomClass('text-sm text-muted-foreground').run();
        },
        id: "muted",
        disabled: () => false,
        isActive: () => {
          return editor.isActive('textStyle', { customClass: 'text-sm text-muted-foreground' })
        },
        label: '<span class="text-sm text-muted-foreground">Muted</span>',
        type: "option",
      },
      {
        icon: "ALargeSmall",
        onClick: () => {
          editor.chain().focus().setCustomClass('text-sm font-medium leading-none').run();
        },
        id: "small",
        disabled: () => false,
        isActive: () => editor.isActive('textStyle', { customClass: 'text-sm font-medium leading-none' }),
        label: '<span class="text-sm font-medium leading-none">Small</span>',
        type: "option",
      },
      {
        icon: "ALargeSmall",
        onClick: () => {
          editor.chain().focus().setCustomClass('text-lg font-semibold').run();
        },
        id: "large",
        disabled: () => false,
        isActive: () => editor.isActive('textStyle', { customClass: 'text-lg font-semibold' }),
        label: '<span class="text-lg font-semibold">Large</span>',
        type: "option",
      },
      {
        icon: "ALargeSmall",
        onClick: () => {
          editor.chain().focus().setCustomClass('text-xl text-muted-foreground').run();
        },
        id: "lead",
        disabled: () => false,
        isActive: () => editor.isActive('textStyle', { customClass: 'text-xl text-muted-foreground' }),
        label: '<span class="text-xl text-muted-foreground">Lead</span>',
        type: "option",
      },
    ],
  });
};
