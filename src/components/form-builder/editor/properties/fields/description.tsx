import { useFormBuilderStore } from "@/stores/form-builder-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function Description() {
  const { updateComponent, selectedComponent } = useFormBuilderStore();

  const handleChange = (field: string, value: any) => {
    if (selectedComponent) {
      updateComponent(selectedComponent.id, field, value);
    }
  };

  return (
    <div className="space-y-1">
      <Label className="text-xs text-gray-400">Description</Label>
      <Input
        value={selectedComponent?.description ?? ""}
        onChange={(e) => handleChange("description", e.target.value)}
      />
    </div>
  );
}
