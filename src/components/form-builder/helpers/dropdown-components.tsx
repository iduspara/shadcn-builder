import { useFormBuilderStore } from "@/stores/form-builder-store";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ComponentIcon } from "./component-icon";
import { AVAILABLE_COMPONENTS } from "@/config/available-components";
import { FormComponentModel } from "../Models/FormComponent";

export const DropdownComponents = ({
    rowId = 0,
    newRow = false,
    after,
    before,
    className,
  }: {
    rowId?: number;
    newRow?: boolean;
    after?: number;
    before?: number;
    className?: string;
  }) => {
    const { addComponent, addRow } = useFormBuilderStore();
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-6 w-6 cursor-pointer active:cursor-grabbing self-center hover:bg-slate-200",
              className
            )}
          >
            <PlusIcon className="h-2 w-2 text-slate-400" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {AVAILABLE_COMPONENTS.map((component) => (
            <DropdownMenuItem
              key={component.id}
              onClick={() =>
                newRow
                  ? addRow(component, after, before)
                  : addComponent(rowId, component)
              }
            >
              <ComponentIcon icon={component.icon} />
              {component.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
