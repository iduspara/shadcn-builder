import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ViewportOverrideIndicator } from "@/components/form-builder/helpers/ViewportOverrideIndicator";
import { ToggleGroupNav } from "@/components/form-builder/ui/toggle-group-nav";
import {
  AlignCenter,
  Columns2,
  Columns3,
  CornerDownRightIcon,
  Rows2,
  Rows3,
} from "lucide-react";
import { AlignLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconPickerDialog } from "../../dialogs/icon-picker-dialog";
import { Slider } from "@/components/ui/slider";

type propertiesWhitelist =
  | "type"
  | "placeholder"
  | "description"
  | "asCard"
  | "value"
  | "checked"
  | "cardLayout"
  | "icon";

export type InputGroupProps = {
  whitelist?: propertiesWhitelist[];
};

export function InputGroup({
  whitelist = [
    "type",
    "placeholder",
    "description",
    "value",
    "checked",
    "icon",
  ],
}: InputGroupProps) {
  const { updateComponent, selectedComponent, viewport } =
    useFormBuilderStore();

  if (!selectedComponent) {
    return null;
  }

  const defaultInputPlaceholder =
    selectedComponent.getField("attributes.placeholder") ?? "";
  const defaultInputDescription =
    selectedComponent.getField("description") || "";
  const defaultValueChecked = selectedComponent.getField("value") ?? false;

  const defaultValueAsCard = selectedComponent.getField(
    "properties.style.asCard",
    viewport
  );

  const defaultValueCardLayout = selectedComponent.getField(
    "properties.style.cardLayout"
  );
  let defaultValueIcon = selectedComponent.getField("properties.style.icon");
  let defaultValueIconStrokeWidth = selectedComponent.getField(
    "properties.style.iconStrokeWidth"
  );
  let defaultValueIconPosition = selectedComponent.getField(
    "properties.style.iconPosition"
  );
  const handleChange = (
    field: string,
    value: any,
    isValidForAllViewports: boolean = false
  ) => {
    updateComponent(selectedComponent.id, field, value, isValidForAllViewports);
  };

  const showOptionsDropdown = ["radio", "select", "native-select"].includes(
    selectedComponent.type
  );
  const currentValue = String(selectedComponent.value ?? "");

  const skipInterval = 2; // Set to 1 to allow no text skipping
  const ticks = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3];

  return (
    <div className="space-y-4">
      {whitelist.includes("value") && (
        <div className="grid grid-cols-2 gap-2 items-center">
          <Label className="text-xs text-gray-400">Value</Label>
          <div className="flex flex-row items-center gap-2">
            {showOptionsDropdown ? (
              <Select
                value={currentValue}
                onValueChange={(value) => handleChange("value", value, true)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a value" />
                </SelectTrigger>
                <SelectContent>
                  {selectedComponent.options?.map((option: any) => (
                    <SelectItem key={option.value} value={String(option.value)}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                value={currentValue}
                onChange={(e) => handleChange("value", e.target.value, true)}
              />
            )}
          </div>
        </div>
      )}
      {whitelist.includes("checked") && (
        <div className="grid grid-cols-2 gap-2 items-center">
          <Label htmlFor="checked" className="text-xs text-gray-400">
            Checked
          </Label>
          <div className="flex flex-row items-center gap-2">
            <ToggleGroupNav
              name="asCard"
              items={[
                { value: "true", label: "yes" },
                { value: "false", label: "no" },
              ]}
              defaultValue={defaultValueChecked ? "true" : "false"}
              onValueChange={(value) =>
                handleChange("value", value === "true", true)
              }
              className="w-full"
            />
          </div>
        </div>
      )}
      {whitelist.includes("placeholder") && (
        <div className="grid grid-cols-2 gap-2 items-center">
          <Label className="text-xs text-gray-400">Placeholder</Label>
          <div className="flex flex-row items-center gap-2">
            <Input
              value={defaultInputPlaceholder}
              onChange={(e) =>
                handleChange("attributes.placeholder", e.target.value, true)
              }
            />
          </div>
        </div>
      )}
      {whitelist.includes("description") && (
        <div className="grid grid-cols-2 gap-2 items-center">
          <Label className="text-xs text-gray-400">Description</Label>
          <div className="flex flex-row items-center gap-2">
            <Input
              value={defaultInputDescription}
              onChange={(e) =>
                handleChange("description", e.target.value, true)
              }
            />
          </div>
        </div>
      )}
      {whitelist.includes("asCard") && (
        <div className="grid grid-cols-2 gap-2 items-center justify-between">
          <Label htmlFor="asCard" className="text-xs text-gray-400">
            As Card
          </Label>
          <div className="flex flex-row items-center gap-2">
            <ToggleGroupNav
              name="asCard"
              items={[
                { value: "yes", label: "yes" },
                { value: "no", label: "no" },
              ]}
              defaultValue={defaultValueAsCard}
              onValueChange={(value) =>
                handleChange("properties.style.asCard", value)
              }
              className="w-full"
            />
            <ViewportOverrideIndicator
              component={selectedComponent}
              field="properties.style.asCard"
            />
          </div>
        </div>
      )}
      {whitelist.includes("cardLayout") && (
        <div className="grid grid-cols-2 gap-2 items-center justify-between">
          <Label htmlFor="cardLayout" className="text-xs text-gray-400">
            Card Layout
          </Label>
          <div className="flex flex-row items-center gap-2">
            <ToggleGroupNav
              name="cardLayout"
              items={[
                { value: "horizontal", icon: Columns3 },
                { value: "vertical", icon: Rows3 },
              ]}
              defaultValue={defaultValueCardLayout}
              onValueChange={(value) =>
                handleChange("properties.style.cardLayout", value, true)
              }
              className="w-full"
            />
          </div>
        </div>
      )}
      {whitelist.includes("icon") && (
        <>
          <div className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-xs text-gray-400">Icon</Label>
            <div className="flex flex-row items-center gap-2">
              <IconPickerDialog
                onSelect={(iconName) =>
                  handleChange("properties.style.icon", iconName, true)
                }
                selectedIcon={defaultValueIcon}
              />
            </div>
          </div>
          {defaultValueIcon && (
            <div className="space-y-4 ml-2">
              <div className="grid grid-cols-2 gap-2 items-start mt-4">
                <Label className="text-xs text-gray-400">Stroke Width</Label>
                <div className="flex flex-col items-center pt-1">
                  <Slider
                    value={[defaultValueIconStrokeWidth]}
                    onValueChange={(value) =>
                      handleChange(
                        "properties.style.iconStrokeWidth",
                        value[0],
                        true
                      )
                    }
                    className="[&>:last-child>span]:border-background [&>:last-child>span]:bg-primary **:data-[slot=slider-thumb]:shadow-none [&>:last-child>span]:h-6 [&>:last-child>span]:w-2 [&>:last-child>span]:border-[3px] [&>:last-child>span]:ring-offset-0"
                    min={0.5}
                    max={3}
                    step={0.25}
                  />
                  <span
                    className="text-muted-foreground mt-3 flex w-full items-center justify-between gap-1 px-2.5 text-xs font-medium"
                    aria-hidden="true"
                  >
                    {ticks.map((tick, i) => (
                      <span
                        key={i}
                        className="flex w-0 flex-col items-center justify-center gap-2"
                      >
                        <span
                          className={cn(
                            "bg-muted-foreground/70 h-1 w-px",
                            i % skipInterval !== 0 && "h-0.5"
                          )}
                        />
                        <span
                          className={cn(i % skipInterval !== 0 && "opacity-0")}
                        >
                          {tick}
                        </span>
                      </span>
                    ))}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <Label className="text-xs text-gray-400">Position</Label>
                <div className="flex flex-row items-center gap-2">
                  <ToggleGroupNav
                    name="iconPosition"
                    items={[
                      { value: "left", label: "left" },
                      { value: "right", label: "right" },
                    ]}
                    defaultValue={defaultValueIconPosition}
                    onValueChange={(value) =>
                      handleChange("properties.style.iconPosition", value, true)
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
