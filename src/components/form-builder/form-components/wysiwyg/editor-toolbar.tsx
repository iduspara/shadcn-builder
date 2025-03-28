import { BubbleMenu, Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  Quote,
  Code,
  Underline,
} from "lucide-react";
import { Icon } from "@/components/form-builder/helpers/Icon";
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
        "text-slate-500 hover:text-slate-700",
        isActive ? "bg-slate-100 text-slate-700" : "bg-white"
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
  }: {
    options: ContentTypeOptions;
    menuRef: React.RefObject<HTMLDivElement | null>;
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
              activeItem ? "bg-slate-100" : "bg-white"
            )}
          >
            <Icon
              name={
                (activeItem?.type === "option" && activeItem.icon) || "Pilcrow"
              }
              className={activeItem ? "text-slate-700" : "text-slate-500"}
            />
            <Icon name="ChevronDown" className="w-2 h-2" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent portalProps={{ container: menuRef?.current }}>
          <div>
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
          </div>
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
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100, maxWidth: "none" }}
      updateDelay={0}
      className={cn(isEditable ? "" : "hidden")}
    >
      <div
        className="flex gap-2 p-2 bg-white rounded-md shadow-sm relative items-center"
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
    </BubbleMenu>
  );
}
