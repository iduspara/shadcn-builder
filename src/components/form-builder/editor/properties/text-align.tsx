import { useFormBuilderStore } from "@/stores/form-builder-store";
import { Label } from "@/components/ui/label";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { ToggleGroupNav } from "@/components/editor/ui/toggle-group-nav";


export function TextAlign() {
  const { updateComponent, selectedComponent, viewport } = useFormBuilderStore();

  let defaultValue = "text-left";

  if (selectedComponent) {
    defaultValue = selectedComponent.getField("properties.style.textAlign", viewport);
  }

  const handleChange = (field: string, value: any) => {
    if (selectedComponent) {
      updateComponent(selectedComponent.id, field, value);
    }
  };

  const alignItems = [
    { value: "text-left", icon: AlignLeft },
    { value: "text-center", icon: AlignCenter },
    { value: "text-right", icon: AlignRight },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 items-center">
      <Label className="text-xs text-gray-400">Text Alignment</Label>
      <ToggleGroupNav
        items={alignItems}
        defaultValue={defaultValue}
        onValueChange={(value) => handleChange("properties.style.textAlign", value)}
        className="w-full"
      />
    </div>
  );
}
