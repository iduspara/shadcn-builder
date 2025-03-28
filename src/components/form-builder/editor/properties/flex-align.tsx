import { useFormBuilderStore } from "@/stores/form-builder-store";
import { Label } from "@/components/ui/label";
import { AlignEndVertical, AlignCenterVertical, AlignStartVertical } from "lucide-react";
import { ToggleGroupNav } from "@/components/editor/ui/toggle-group-nav";


export function FlexAlign() {
  const { updateComponent, selectedComponent, viewport } =
    useFormBuilderStore();

  let defaultValue = "items-start";

  if (selectedComponent) {
    defaultValue = selectedComponent.getField("properties.style.flexAlign", viewport);
  }


  const handleChange = (field: string, value: any) => {
    if (selectedComponent) {
      updateComponent(selectedComponent.id, field, value);
    }
  };

  const alignItems = [
    { value: "items-start", icon: AlignStartVertical },
    { value: "items-center", icon: AlignCenterVertical },
    { value: "items-end", icon: AlignEndVertical },
  ];

  return selectedComponent ? (
    <div className="grid grid-cols-2 gap-2 items-center">
      <Label className="text-xs text-gray-400">Flex Alignment</Label>
      <ToggleGroupNav
        items={alignItems}
        defaultValue={defaultValue}
        onValueChange={(value) => handleChange("properties.style.flexAlign", value)}
      />
    </div>
  ) : null;
}
