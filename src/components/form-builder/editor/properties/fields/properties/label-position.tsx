import { useFormBuilderStore } from "@/stores/form-builder-store";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function LabelPosition() {
  const { updateComponent, selectedComponent, updateRow, selectedRow } =
    useFormBuilderStore();

  let defaultValue = "top";

  if (selectedComponent) {
    defaultValue =
      selectedComponent.properties?.labelPosition ?? defaultValue;
  }


  const handleChange = (field: string, value: any) => {
    if (selectedComponent) {
      updateComponent(selectedComponent.id, field, value);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 items-center pl-2">
      <Label className="text-xs text-gray-400">
        Label Position
    </Label>
    <Select
      value={defaultValue}
      onValueChange={(value) =>
        handleChange("properties.labelPosition", value)
      }
    >
      <SelectTrigger>
        <SelectValue placeholder="Select position" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="top">Top</SelectItem>
        <SelectItem value="left">Left</SelectItem>
        <SelectItem value="right">Right</SelectItem>
      </SelectContent>
    </Select>
  </div>
  );
}
