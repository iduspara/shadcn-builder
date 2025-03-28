import { useFormBuilderStore } from "@/stores/form-builder-store";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ColSpan() {
  const { updateComponent, selectedComponent, viewport } =
    useFormBuilderStore();

  let defaultValue = "auto";
  let defaultValueColStart = "auto";
  
  if (selectedComponent) {
    defaultValue = selectedComponent.getField("properties.style.colSpan", viewport);
    defaultValueColStart = selectedComponent.getField("properties.style.colStart", viewport);
  }

  const handleChangeColSpan = (field: string, value: any) => {
    if (selectedComponent) {
      updateComponent(selectedComponent.id, field, value);
    }
  };

  const handleChangeColStart = (field: string, value: any) => {
    if (selectedComponent) {
      updateComponent(selectedComponent.id, field, value);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-2 items-center">
        <Label className="text-xs text-gray-400 flex-1 inline-block">
          Column Span
        </Label>
        <Select
          value={defaultValue}
          onValueChange={(value) =>
            handleChangeColSpan("properties.style.colSpan", value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select column span" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="col-auto">Auto</SelectItem>
            {Array.from({length: 12}, (_, i) => i + 1).map((num) => (
              <SelectItem key={num} value={`col-span-${num}`}>
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-2 items-center">
        <Label className="text-xs text-gray-400 flex-1 inline-block">
          Column start
        </Label>
        <Select
          value={defaultValueColStart}
          onValueChange={(value) =>
            handleChangeColStart("properties.style.colStart", value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select column start" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="col-start-auto">Auto</SelectItem>
            {Array.from({length: 12}, (_, i) => i + 1).map((num) => (
              <SelectItem key={num} value={`col-start-${num}`}>
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
