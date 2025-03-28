import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useEffect } from "react";

interface ToggleGroupNavProps {
  items: {
    value: string;
    icon?: LucideIcon;
    label?: string;
  }[];
  defaultValue: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function ToggleGroupNav({
  items,
  defaultValue,
  onValueChange,
  className,
}: ToggleGroupNavProps) {
  return (
    <ToggleGroup
      type="single"
      value={defaultValue}
      onValueChange={onValueChange}
      className={cn("flex bg-muted rounded-md p-0.5 h-auto", className)}
      size="sm"
    >
      {items.map((item) => (
        <ToggleGroupItem
          key={item.value}
          value={item.value}
          className="h-auto p-1.5 flex-1 text-muted-foreground data-[state=on]:bg-white data-[state=on]:text-accent-foreground hover:bg-white hover:text-accent-foreground cursor-pointer"
        >
          {item.icon && <item.icon className="h-4 w-4" />}
          
          {item.label && <span className="text-xs select-none">{item.label}</span>}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
} 
