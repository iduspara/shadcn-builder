import { useFormBuilderStore } from "@/stores/form-builder-store";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function InputType() {
  const { updateComponent, selectedComponent } =
    useFormBuilderStore();

  let defaultValue = "text";

  if (selectedComponent) {
    defaultValue = selectedComponent.attributes?.type ?? 'text';
  }

  if (selectedComponent?.type === "button") {
    defaultValue = selectedComponent.attributes?.type ?? 'submit';
  }


  const handleChange = (field: string, value: any) => {
    if (selectedComponent) {
      updateComponent(selectedComponent.id, field, value);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 items-center">
    <Label className="text-xs text-gray-400">Type</Label>
    <Select
      value={defaultValue}
      onValueChange={(value) =>
        handleChange("attributes.type", value)
      }
    >
      <SelectTrigger>
        <SelectValue placeholder="Select type" />
      </SelectTrigger>
      {selectedComponent?.type !== "button" && (
        <SelectContent>
          {[
            "text",
            "number",
            "email",
            "password",
            "tel",
            "url",
          ].map((key) => (
            <SelectItem key={key} value={key}>
              {key}
            </SelectItem>
          ))}
        </SelectContent>
      )}

      {selectedComponent?.type === "button" && (
        <SelectContent>
          <SelectItem value="submit">Submit</SelectItem>
          <SelectItem value="reset">Reset</SelectItem>
        </SelectContent>
      )}
    </Select>
  </div>
  );
}
