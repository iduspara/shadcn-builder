"use client";

import * as React from "react";
import { Search, Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { icons} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useVirtualizer, type VirtualItem } from "@tanstack/react-virtual";
import { Suspense, useEffect } from "react";

interface IconPickerDialogProps {
  onSelect: (iconName: string) => void;
  selectedIcon?: string;
}

const IconListGrid = ({
  search,
  onSelect,
  selectedIcon,
  setOpen,
}: {
  search: string;
  onSelect: (iconName: string) => void;
  selectedIcon?: string;
  setOpen: (open: boolean) => void;
}) => {
  const IconsKeyList = Object.keys(icons);
  const filterIcons = (search: string) => {
    if (search === "") {
      return IconsKeyList;
    }
    return IconsKeyList.filter((iconName) =>
      iconName.toLowerCase().includes(search.toLowerCase())
    );
  };

  const parentRef = React.useRef<HTMLDivElement>(null);

  const [hoveredIcon, setHoveredIcon] = React.useState<string | null>(null);
  const filteredIcons = filterIcons(search);
  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(filteredIcons.length / 6),
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72, // height of each row (48px) + gap (8px)
    overscan: 5,
  });

  const rowItems = rowVirtualizer.getVirtualItems();

  return (
    <div
      ref={parentRef}
      className="h-[400px] overflow-auto relative scrollbar-hide"
      style={{
        contain: "strict",
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowItems.map((virtualRow: VirtualItem) => {
          const startIndex = virtualRow.index * 6;
          const rowIcons = filteredIcons.slice(startIndex, startIndex + 6);

          return (
            <div
              key={virtualRow.index}
              className="absolute top-0 left-0 w-full grid grid-cols-6 gap-2"
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {rowIcons.length > 0 &&
                rowIcons.map((iconName) => {
                  const Icon = icons[
                    iconName as keyof typeof icons
                  ] as LucideIcon;
                  const isSelected = selectedIcon === iconName;
                  const isHovered = hoveredIcon === iconName;

                  if (!Icon) {
                    return null;
                  }

                  return (
                    <Button
                      variant="outline"
                      key={iconName}
                      className={cn(
                        "h-16 w-16",
                        isSelected && "bg-accent text-accent-foreground border-primary",
                        isHovered && "bg-accent/50"
                      )}
                      onClick={() => {
                        onSelect(iconName);
                        setOpen(false);
                      }}
                      onMouseEnter={() => setHoveredIcon(iconName)}
                      onMouseLeave={() => setHoveredIcon(null)}
                    >
                      <Icon className="size-8 text-primary" strokeWidth={isSelected ? 1.5 : 1} />
                    </Button>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export function IconPickerDialog({
  onSelect,
  selectedIcon,
}: IconPickerDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selectedIconText, setSelectedIconText] = React.useState<string>();
  const [selectedIconIcon, setSelectedIconIcon] = React.useState<LucideIcon>();

  useEffect(() => {
    setSelectedIconText(selectedIcon || "");
    setSelectedIconIcon(icons[selectedIcon as keyof typeof icons] as LucideIcon);
  }, [selectedIcon]);

  const onIconSelect = (iconName: string) => {
    setSelectedIconText(iconName);
    setSelectedIconIcon(icons[iconName as keyof typeof icons] as LucideIcon);
    onSelect(iconName);
    setOpen(false);
  };

  const onIconDeselect = () => {
    setSelectedIconText("");
    setSelectedIconIcon(undefined);
    onSelect("");
    setOpen(false);
  };

  const Icon = selectedIconIcon ? selectedIconIcon : null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div
        className={cn(
          "flex flex-row items-center gap-2 w-full",
          buttonVariants({ variant: "outline", size: "sm" }),
          "text-sm font-normal text-left"
        )}
      >
        <DialogTrigger asChild>
          <div className="flex items-center justify-between w-full">
            {Icon ? <Icon className="size-4" /> : "Pick an Icon"}
          </div>
        </DialogTrigger>
        {selectedIconText && (
          <div className="flex items-center justify-center" onClick={onIconDeselect}>
            <X className="size-4 text-muted-foreground opacity-50"/>
          </div>
        )}
      </div>
      <DialogContent className="sm:max-w-[480px] pb-0">
        <DialogHeader>
          <DialogTitle>Pick an Icon</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search icons..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <IconListGrid
            search={search}
            onSelect={onIconSelect}
            setOpen={setOpen}
            selectedIcon={selectedIcon}
          />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
