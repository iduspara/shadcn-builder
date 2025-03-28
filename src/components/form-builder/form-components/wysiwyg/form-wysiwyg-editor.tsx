import React, { useMemo, memo, useState, useEffect } from "react";
import { useEditor, EditorContent, mergeAttributes } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Heading } from "@tiptap/extension-heading";
import { Underline } from "@tiptap/extension-underline";
import TextStyle from '@tiptap/extension-text-style'
import "./form-wysiwyg-editor.css";
import { EditorToolbar } from "./editor-toolbar";
import customClass from "./extensions/textCustomStyle";
interface FormWysiwygEditorProps {
  isEditable?: boolean;
  value: string;
  onChange: (content: string) => void;
}

export const TextColorStyle = TextStyle.extend({
  parseHTML() {
    return [
      {
        tag: 'span',
        getAttrs: element => {
          return {
            class: element.classList.toString(),
          }
        },
      },
    ]
  },
});

export const FormWysiwygEditor: React.FC<FormWysiwygEditorProps> = memo(
  ({ value, onChange, isEditable = false }) => {
    // Memoize editor extensions
    const extensions = useMemo(
      () => [
        StarterKit.configure({
          paragraph: {
            HTMLAttributes: {
              class: "leading-7 not-first:mt-6",
            },
          },
          codeBlock: {
            HTMLAttributes: {
              class:
                "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
            },
          },
          blockquote: {
            HTMLAttributes: {
              class: "mt-6 border-l-2 pl-6 italic",
            },
          },
          heading: false,
        }),
        Heading.configure({ levels: [1, 2, 3, 4] }).extend({
          levels: [1, 2, 3, 4],
          renderHTML({ node, HTMLAttributes }) {
            const level = this.options.levels.includes(node.attrs.level)
              ? node.attrs.level
              : this.options.levels[0];
            const classes: Record<number, string> = {
              1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
              2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
              3: "scroll-m-20 text-2xl font-semibold tracking-tight",
              4: "scroll-m-20 text-xl font-semibold tracking-tight",
            };
            return [
              `h${level}`,
              mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                class: classes[level as 1 | 2 | 3 | 4],
              }),
              0,
            ];
          },
        }),
        Underline,
        TextColorStyle,
        customClass,
      ],
      []
    );

    const editor = useEditor({
      editable: true,
      immediatelyRender: false,
      extensions,
      content: value,
      onUpdate: ({ editor }) => {
        onChange(editor.getHTML());
      },
    });

    // Only update content when value prop changes and it's different from our local content

    if (!editor) {
      return null;
    }

    return (
      <>
        <EditorToolbar editor={editor} isEditable={isEditable} />
        <EditorContent editor={editor} />
      </>
    );
  }
);

FormWysiwygEditor.displayName = "FormWysiwygEditor";
