import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  Quote,
  Code,
  Underline,
} from "lucide-react";
import { Icon } from "@/components/form-builder/helpers/icon-render";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import {
  ContentTypeCategory,
  ContentTypeOption,
  ContentTypeOptions,
  useEditorContentTypes,
} from "./hooks/useEditorContentTypes";
import { useTextAlign } from "./hooks/useTextAlign";
import { icons } from "lucide-react";

// Memoize the toolbar button to prevent re-renders
const ToolbarButton = memo(
  ({
    isActive,
    onClick,
    children,
  }: {
    isActive?: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <Button
      onClick={onClick}
      variant="ghost"
      size="sm"
      className={cn(
        "text-muted-foreground hover:text-primary",
        isActive ? "bg-muted text-primary" : "bg-white"
      )}
    >
      {children}
    </Button>
  )
);

ToolbarButton.displayName = "ToolbarButton";

const isOption = (
  option: ContentTypeOption | ContentTypeCategory 
): option is ContentTypeOption => option.type === "option";

const isCategory = (
  option: ContentTypeOption | ContentTypeCategory
): option is ContentTypeCategory  =>
  option.type === "category";

const ToolbarDropdownMenu = memo(
  ({
    options,
    menuRef,
    defaultIcon = "Pilcrow",
  }: {
    options: ContentTypeOptions;
    menuRef: React.RefObject<HTMLDivElement | null>;
    defaultIcon?: keyof typeof icons;
  }) => {
    const activeItem = useMemo(
      () => options.find((option) => isOption(option) && option.isActive()),
      [options]
    );

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              activeItem ? "bg-muted" : "bg-white"
            )}
          >
            <Icon
              name={
                (activeItem?.type === "option" && activeItem.icon) || defaultIcon
              }
              className={"text-primary"}
            />
            <Icon name="ChevronDown" className="w-2 h-2 text-primary" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            {options.map((option) => {
              return (
                <div key={option.id}>
                  {isOption(option) && (
                    <DropdownMenuItem
                      key={option.id}
                      onSelect={option.onClick}
                      className={option.isActive() ? "bg-accent" : ""}
                    >
                      {option.icon && (
                        <Icon
                          name={option.icon}
                          className="w-4 h-4 text-slate-700"
                        />
                      )}
                      <span
                        dangerouslySetInnerHTML={{ __html: option.label }}
                      />
                    </DropdownMenuItem>
                  )}
                  {isCategory(option) && (
                    <DropdownMenuLabel
                      key={option.id}
                      className="cursor-default text-slate-500 mt-1"
                    >
                      {option.label}
                    </DropdownMenuLabel>
                  )}
                </div>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);

ToolbarDropdownMenu.displayName = "ToolbarDropdownMenu";

const ToolbarSeparator = memo(() => (
  <div className="bg-neutral-200 dark:bg-neutral-800 h-full min-h-[1.5rem] w-[1px] mx-1 first:ml-0 last:mr-0" />
));

ToolbarSeparator.displayName = "ToolbarSeparator";

export function EditorToolbar({
  editor,
  isEditable,
}: {
  editor: Editor;
  isEditable: boolean;
}) {
  const options = useEditorContentTypes(editor);
  const textAlign = useTextAlign(editor);
  const menuRef = useRef<HTMLDivElement>(null);

  return (

      <div
        className="flex gap-2 relative items-center z-20"
        ref={menuRef}
      >
        <ToolbarDropdownMenu options={options} menuRef={menuRef} />
        <ToolbarSeparator />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        >
          <Bold />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        >
          <Italic />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
        >
          <Underline />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
        >
          <Strikethrough />
        </ToolbarButton>
        <ToolbarDropdownMenu options={textAlign} menuRef={menuRef} defaultIcon="TextAlignStart" />
        <ToolbarSeparator />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive("codeBlock")}
        >
          <Code />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
        >
          <Quote />
        </ToolbarButton>
      </div>
  );
}
