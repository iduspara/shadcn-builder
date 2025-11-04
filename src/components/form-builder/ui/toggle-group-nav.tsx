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
  name?: string;
}

export function ToggleGroupNav({
  items,
  defaultValue,
  onValueChange,
  className,
  name
}: ToggleGroupNavProps) {
  const handleValueChange = (value: string) => {
    if (value && value !== defaultValue) {
      onValueChange(value);
    }
  };


  return (
    <ToggleGroup
      type="single"
      value={defaultValue}
      onValueChange={handleValueChange}
      className={cn("flex border bg-accent dark:bg-transparent rounded-md h-auto shadow-xs", className)}
      size="sm"
    >
      {items.map((item) => {
        const toggleName = name ? `toggle__${name}__${item.value}` : `toggle__${item.value}`;
        return (
        <ToggleGroupItem
          key={item.value}
          value={item.value}
          name={toggleName}
          className="h-auto p-1.5 flex-1 text-muted-foreground data-[state=on]:bg-white dark:data-[state=on]:bg-accent data-[state=on]:text-primary hover:bg-white dark:hover:bg-muted hover:text-accent-foreground cursor-pointer"
        >
          {item.icon && <item.icon className="h-4 w-4" />}
          
          {item.label && <span className="text-xs select-none">{item.label}</span>}
        </ToggleGroupItem>
        )
      })}
    </ToggleGroup>

  );
} 
