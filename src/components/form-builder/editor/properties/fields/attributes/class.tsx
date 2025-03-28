import { useFormBuilderStore } from "@/stores/form-builder-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Viewport } from "@radix-ui/react-select";

export function ClassField() {
  const { updateComponent, selectedComponent, viewport } = useFormBuilderStore();

  let defaultValue = "";

  if (selectedComponent) {
    defaultValue = selectedComponent.getField("attributes.class", viewport);
  }

  const handleChange = (field: string, value: any) => {
    if (selectedComponent) {
      updateComponent(selectedComponent.id, field, value);
    }
  };

  return (
    <div className="space-y-1">
      <Label className="text-xs text-gray-400">Class</Label>
      <Input
        value={defaultValue}
        onChange={(e) => handleChange("attributes.class", e.target.value)}
      />
    </div>
  );
}
