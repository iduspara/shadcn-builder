import { useFormBuilderStore } from "@/stores/form-builder-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function HtmlGroup() {
  const { updateComponent, selectedComponent, viewport } =
    useFormBuilderStore();

  if (!selectedComponent) return null;

  const defaultIdValue = selectedComponent.getField("attributes.id") || "";
  const defaultNameValue = selectedComponent.getField("attributes.name") || "";
  const defaultClassValue = selectedComponent.getField(
    "attributes.class",
    viewport
  );

  const handleChange = (field: string, value: any, isValidForAllViewports: boolean = false) => {
    updateComponent(selectedComponent.id, field, value, isValidForAllViewports);
  };
  return (
    <>
      <div className="grid grid-cols-2 gap-2 items-center justify-between">
        <Label className="text-xs text-gray-400">ID</Label>
        <Input
          value={defaultIdValue}
          onChange={(e) => handleChange("attributes.id", e.target.value, true)}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 items-center justify-between">
        <Label className="text-xs text-gray-400">Name</Label>
        <Input
          value={defaultNameValue}
          onChange={(e) => handleChange("attributes.name", e.target.value, true)}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 items-center justify-between">
        <Label className="text-xs text-gray-400">Class</Label>
        <Input
          value={defaultClassValue}
          onChange={(e) => handleChange("attributes.class", e.target.value, true)}
        />
      </div>
    </>
  );
}
