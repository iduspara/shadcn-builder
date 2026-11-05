import { useFormBuilderStore } from "@/stores/form-builder-store";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { IconPickerDialog } from "../../dialogs/icon-picker-dialog";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { CornerDownRightIcon } from "lucide-react";
import { ToggleGroupNav } from "../../ui/toggle-group-nav";

const BUTTON_TYPE_ITEMS = [
  { value: "button", label: "Button" },
  { value: "submit", label: "Submit" },
  { value: "reset", label: "Reset" },
];

const BUTTON_VARIANT_ITEMS = [
  { value: "default", label: "Default" },
  { value: "outline", label: "Outline" },
  { value: "ghost", label: "Ghost" },
  { value: "link", label: "Link" },
];

type propertiesWhitelist = "type" | "content" | "variant" | "icon";

export type ButtonGroupProps = {
  whitelist?: propertiesWhitelist[];
};

export function ButtonGroup({
  whitelist = ["type", "content", "variant", "icon"],
}: ButtonGroupProps) {
  const { updateComponent, selectedComponent } = useFormBuilderStore();

  if (!selectedComponent) {
    return null;
  }

  let defaultInputType = selectedComponent.getField("attributes.type");
  let defaultInputContent = selectedComponent.getField("content");
  let defaultValueVariant =
    selectedComponent.getField("properties.variant") || "default";
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

  const handleChangeVariant = (field: string, value: any) => {
    updateComponent(selectedComponent.id, field, value, true);
  };

  const skipInterval = 2; // Set to 1 to allow no text skipping
  const ticks = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3];

  return (
    <>
      {whitelist.includes("content") && (
        <div className="grid grid-cols-2 gap-2 items-center">
          <Label className="text-xs text-gray-400">Content</Label>
          <div className="flex flex-row items-center gap-2">
            <Input
              value={defaultInputContent}
              onChange={(e) => handleChange("content", e.target.value, true)}
            />
          </div>
        </div>
      )}
      {whitelist.includes("type") && (
        <div className="grid grid-cols-2 gap-2 items-center">
          <Label className="text-xs text-gray-400">Type</Label>
          <div className="flex flex-row items-center gap-2">
            <Select
              items={BUTTON_TYPE_ITEMS}
              value={defaultInputType}
              onValueChange={(value) =>
                handleChange("attributes.type", value, true)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {BUTTON_TYPE_ITEMS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      {whitelist.includes("variant") && (
        <div className="grid grid-cols-2 gap-2 items-center">
          <Label className="text-xs text-gray-400 flex-1 inline-block">
            Variant
          </Label>
          <div className="flex flex-row items-center gap-2">
            <Select
              items={BUTTON_VARIANT_ITEMS}
              value={defaultValueVariant}
              onValueChange={(value) =>
                handleChangeVariant("properties.variant", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select variant" />
              </SelectTrigger>
              <SelectContent>
                {BUTTON_VARIANT_ITEMS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                        Array.isArray(value) ? value[0] : value,
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
    </>
  );
}
