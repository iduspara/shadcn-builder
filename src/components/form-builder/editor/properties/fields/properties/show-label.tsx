import { useFormBuilderStore } from "@/stores/form-builder-store";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function ShowLabel() {
  const { updateComponent, selectedComponent, updateRow, selectedRow } =
    useFormBuilderStore();

  let defaultValue = false;

  if (selectedComponent) {
    defaultValue =
      selectedComponent.properties?.showLabel ?? defaultValue;
  }


  const handleChange = (field: string, value: any) => {
    if (selectedComponent) {
      updateComponent(selectedComponent.id, field, value);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 items-center justify-between">
    <Label
      htmlFor="showLabel"
      className="text-xs text-gray-400"
    >
      Show Label
    </Label>
    <Switch
      id="showLabel"
      checked={defaultValue}
      onCheckedChange={(checked) =>
        handleChange("properties.showLabel", checked)
      }
        className="justify-self-end"
      />
    </div>
  );
}
