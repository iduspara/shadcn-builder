import { useFormBuilderStore } from "@/stores/form-builder-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function Placeholder() {
  const { updateComponent, selectedComponent } = useFormBuilderStore();

  const handleChange = (field: string, value: any) => {
    if (selectedComponent) {
      updateComponent(selectedComponent.id, field, value);
    }
  };

  return (
    <div className="space-y-1">
      <Label className="text-xs text-gray-400">Placeholder</Label>
      <Input
        value={selectedComponent?.placeholder ?? ""}
        onChange={(e) => handleChange("placeholder", e.target.value)}
      />
    </div>
  );
}
