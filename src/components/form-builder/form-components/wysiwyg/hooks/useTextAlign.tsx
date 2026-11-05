import { Editor, useEditorState } from "@tiptap/react";
import { icons } from "lucide-react";

type TextAlignOption = {
  label: string;
  id: string;
  type: "option";
  disabled: () => boolean;
  isActive: () => boolean;
  onClick: () => void;
  icon: keyof typeof icons | null;
};

type TextAlignCategory = {
  label: string;
  id: string;
  type: "category";
};

type TextAlignOptions = Array<TextAlignOption | TextAlignCategory>;

export const useTextAlign = (editor: Editor) => {
  return useEditorState({
    editor,
    selector: (ctx): TextAlignOptions => [
      {
        icon: "TextAlignStart",
        onClick: () => ctx.editor.chain().focus().setTextAlign("left").run(),
        id: "alignLeft",
        disabled: () => !ctx.editor.can().setTextAlign("left"),
        isActive: () => ctx.editor.isActive({ textAlign: "left" }),
        label: "Align Left",
        type: "option",
      },
      {
        icon: "TextAlignCenter",
        onClick: () => ctx.editor.chain().focus().setTextAlign("center").run(),
        id: "alignCenter",
        disabled: () => !ctx.editor.can().setTextAlign("center"),
        isActive: () => ctx.editor.isActive({ textAlign: "center" }),
        label: "Align Center",
        type: "option",
      },
      {
        icon: "TextAlignEnd",
        onClick: () => ctx.editor.chain().focus().setTextAlign("right").run(),
        id: "alignRight",
        disabled: () => !ctx.editor.can().setTextAlign("right"),
        isActive: () => ctx.editor.isActive({ textAlign: "right" }),
        label: "Align Right",
        type: "option",
      },
    ],
  });
};
