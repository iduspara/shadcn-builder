import { useFormBuilderStore } from "@/stores/form-builder-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function NameField() {
  const { updateComponent, selectedComponent } = useFormBuilderStore();

  const handleChange = (field: string, value: any) => {
    if (selectedComponent) {
      updateComponent(selectedComponent.id, field, value);
    }
  };

  return (
    <div className="space-y-1">
      <Label className="text-xs text-gray-400">Name</Label>
      <Input
        value={selectedComponent?.attributes?.name}
        onChange={(e) => handleChange("attributes.name", e.target.value)}
      />
    </div>
  );
}
