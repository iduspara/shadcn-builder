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
import { ToggleGroupNav } from "@/components/form-builder/ui/toggle-group-nav";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { ViewportOverrideIndicator } from "@/components/form-builder/helpers/ViewportOverrideIndicator";

type propertiesWhitelist = "label" | "label_description" | "labelPosition" | "labelAlign" | "showLabel";

export type LabelGroupProps = {
  whitelist?: propertiesWhitelist[];
};

export function LabelGroup({ whitelist = ["label", "label_description", "labelPosition", "labelAlign", "showLabel"] }: LabelGroupProps) {
  const { updateComponent, selectedComponent, viewport } =
    useFormBuilderStore();

  if (!selectedComponent) {
    return null;
  }

  const alignmentItems = [
    { value: "start", icon: AlignLeft },
    { value: "center", icon: AlignCenter },
    { value: "end", icon: AlignRight },
  ];

  const defaultValueShowLabel = selectedComponent.getField(
    "properties.style.showLabel",
    viewport
  );
  const defaultValueLabel = selectedComponent.getField("label");
  const defaultValueLabelDescription = selectedComponent.getField("label_description");
  const defaultValueLabelPosition = selectedComponent.getField(
    "properties.style.labelPosition",
    viewport
  );
  const defaultValueLabelAlign = selectedComponent.getField(
    "properties.style.labelAlign",
    viewport
  );

  const handleChange = (field: string, value: any, isValidForAllViewports: boolean = false) => {
    updateComponent(selectedComponent.id, field, value, isValidForAllViewports);
  };

  return (
    <>
      {whitelist.includes("showLabel") && (
      <div className="grid grid-cols-2 gap-2 items-center justify-between">
        <Label htmlFor="showLabel" className="text-xs text-gray-400">
          Show Label
        </Label>
        <div className="flex flex-row items-center gap-2">
          <ToggleGroupNav
            items={[
              { value: "yes", label: "yes" },
              { value: "no", label: "no" },
            ]}
            defaultValue={defaultValueShowLabel}
            onValueChange={(value) =>
              handleChange("properties.style.showLabel", value)
            }
            className="w-full"
          />
          <ViewportOverrideIndicator
            component={selectedComponent}
            field="properties.style.showLabel"
            />
          </div>
        </div>
      )}
      {whitelist.includes("label") && (
        <div className="grid grid-cols-2 gap-2 items-center justify-between">
          <Label className="text-xs text-gray-400">Label</Label>
          <div className="flex flex-row items-center gap-2">
          <Input
            value={defaultValueLabel}
            onChange={(e) => handleChange("label", e.target.value, true)}
            className="w-full"
          />
          </div>
        </div>
      )}
      {whitelist.includes("label_description") && (
        <div className="grid grid-cols-2 gap-2 items-center justify-between">
          <Label className="text-xs text-gray-400">Label Description</Label>
          <div className="flex flex-row items-center gap-2">
          <Input
            value={defaultValueLabelDescription}
            onChange={(e) => handleChange("label_description", e.target.value, true)}
            className="w-full"
          />
          </div>
        </div>
      )}
      {whitelist.includes("labelPosition") && (
        <div className="grid grid-cols-2 gap-2 items-center">
          <Label className="text-xs text-gray-400 pl-2">Label Position</Label>
          <div className="flex flex-row items-center gap-2">
          <Select
            value={defaultValueLabelPosition}
            onValueChange={(value) =>
              handleChange("properties.style.labelPosition", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="top">Top</SelectItem>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>
          <ViewportOverrideIndicator
            component={selectedComponent}
            field="properties.style.labelPosition"
            />
          </div>
        </div>
      )}
      {whitelist.includes("labelAlign") && (
        <div className="grid grid-cols-2 gap-2 items-center">
          <Label className="text-xs text-gray-400 pl-2">Label Alignment</Label>
        <div className="flex flex-row items-center gap-2">
          <ToggleGroupNav
            items={alignmentItems}
            defaultValue={defaultValueLabelAlign}
            onValueChange={(value) =>
              handleChange("properties.style.labelAlign", value)
            }
            className="w-full"
          />
          <ViewportOverrideIndicator
            component={selectedComponent}
            field="properties.style.labelAlign"
            />
          </div>
        </div>
      )}
    </>
  );
}
