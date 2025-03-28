import { useFormBuilderStore } from "@/stores/form-builder-store";
import { Label } from "@/components/ui/label";
import { AlignCenterHorizontal, AlignEndHorizontal } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AlignStartHorizontal } from "lucide-react";
import { ToggleGroupNav } from "@/components/editor/ui/toggle-group-nav";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";

export function LabelAlignment() {
  const { updateComponent, selectedComponent, updateRow, selectedRow } =
    useFormBuilderStore();

  let defaultValue = "items-start";

  if (selectedComponent) {
    defaultValue = selectedComponent.properties?.labelAlign ?? defaultValue;
  }

  const handleChange = (field: string, value: any) => {
    if (selectedComponent) {
      updateComponent(selectedComponent.id, field, value);
    }
  };

  const alignmentItems = [
    { value: "left", icon: AlignLeft },
    { value: "center", icon: AlignCenter },
    { value: "right", icon: AlignRight },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 items-center pl-2">
      <Label className="text-xs text-gray-400">Label Alignment</Label>
      <ToggleGroupNav
        items={alignmentItems}
        defaultValue={defaultValue}
        onValueChange={(value) => handleChange("properties.labelAlign", value)}
        className="w-full"
      />
    </div>
  )
}
