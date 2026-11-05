import { useFormBuilderStore } from "@/stores/form-builder-store";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ViewportOverrideIndicator } from "@/components/form-builder/helpers/ViewportOverrideIndicator";
import { ToggleGroupNav } from "@/components/form-builder/ui/toggle-group-nav";

const COL_START_ITEMS = [
  { value: "auto", label: "Auto" },
  ...Array.from({ length: 12 }, (_, i) => ({
    value: `${i + 1}`,
    label: `${i + 1}`,
  })),
];

export function GridGroup() {
  const { updateComponent, selectedComponent, viewport } =
    useFormBuilderStore();

  if (!selectedComponent) {
    return null;
  }

  let defaultValue = "auto";
  let defaultValueColStart = "auto";
  let defaultValueVisible = "yes";

  defaultValue = selectedComponent.getField(
    "properties.style.colSpan",
    viewport
  );
  defaultValueColStart = selectedComponent.getField(
    "properties.style.colStart",
    viewport
  );
  defaultValueVisible = selectedComponent.getField(
    "properties.style.visible",
    viewport
  ) || "yes";


  const handleChangeColSpan = (field: string, value: any) => {
    updateComponent(selectedComponent.id, field, value);
  };

  const handleChangeColStart = (field: string, value: any) => {
    updateComponent(selectedComponent.id, field, value);
  };

  const handleChangeVisible = (field: string, value: any) => {
    updateComponent(selectedComponent.id, field, value);
  };



  return (
    <>
      <div className="grid grid-cols-2 gap-2 items-center">
        <Label className="text-xs text-gray-400 flex-1 inline-block">
          Visible
        </Label>
        <div className="flex flex-row items-center gap-2">
          <ToggleGroupNav
            name="visible"
            items={[
              { value: "yes", label: "yes" },
              { value: "no", label: "no" },
            ]}
            defaultValue={defaultValueVisible}
            onValueChange={(value) =>
              handleChangeVisible("properties.style.visible", value)
            }
            className="w-full"
          />
          <ViewportOverrideIndicator
            component={selectedComponent}
            field="properties.style.visible"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 items-center">
        <Label className="text-xs text-gray-400 flex-1 inline-block">
          Column Span
        </Label>
        <div className="flex flex-row items-center gap-2">
          <Select
            value={defaultValue}
            onValueChange={(value) =>
              handleChangeColSpan("properties.style.colSpan", value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select column span" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                <SelectItem key={num} value={`${num}`}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ViewportOverrideIndicator
            component={selectedComponent}
            field="properties.style.colSpan"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 items-center">
        <Label className="text-xs text-gray-400 flex-1 inline-block">
          Column start
        </Label>
        <div className="flex flex-row items-center gap-2">
          <Select
            items={COL_START_ITEMS}
            value={defaultValueColStart}
            onValueChange={(value) =>
              handleChangeColStart("properties.style.colStart", value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select column start" />
            </SelectTrigger>
            <SelectContent>
              {COL_START_ITEMS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ViewportOverrideIndicator
            component={selectedComponent}
            field="properties.style.colStart"
          />
        </div>
      </div>
    </>
  );
}
