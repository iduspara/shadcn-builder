import { useFormBuilderStore } from "@/stores/form-builder-store";
import { Label as LabelUI } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function Label() {
  const { updateComponent, selectedComponent } = useFormBuilderStore();

  const handleChange = (field: string, value: any) => {
    if (selectedComponent) {
      updateComponent(selectedComponent.id, field, value);
    }
  };

  return (
    <div className="space-y-1">
      <LabelUI className="text-xs text-gray-400">Label</LabelUI>
      <Input
        value={selectedComponent?.label}
        onChange={(e) => handleChange("label", e.target.value)}
      />
    </div>
  );
}
