import { useFormBuilderStore } from "@/stores/form-builder-store";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
export function ContentType() {
  const { updateComponent, selectedComponent } = useFormBuilderStore();

  const handleChange = (field: string, value: any) => {
    if (selectedComponent) {
      updateComponent(selectedComponent.id, field, value);
    }
  };

  return (
    <div className="space-y-1">
      <Label className="text-xs text-gray-400">Content</Label>
      <Textarea
        value={selectedComponent?.content}
        onChange={(e) => handleChange("content", e.target.value)}
      />
    </div>
  );
}
