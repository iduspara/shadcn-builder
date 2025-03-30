import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ViewportOverrideIndicator } from "@/components/form-builder/helpers/ViewportOverrideIndicator";
import { ToggleGroupNav } from "@/components/form-builder/ui/toggle-group-nav";

type propertiesWhitelist = "type" | "placeholder" | "description" | "asCard";

export type InputGroupProps = {
  whitelist?: propertiesWhitelist[];
};

export function InputGroup({
  whitelist = ["type", "placeholder", "description", "asCard"],
}: InputGroupProps) {
  const { updateComponent, selectedComponent, viewport } = useFormBuilderStore();

  if (!selectedComponent) {
    return null;
  }

  const defaultInputPlaceholder =
    selectedComponent.getField("attributes.placeholder") ?? "";
  const defaultInputDescription =
    selectedComponent.getField("description") || "";

  const defaultValueAsCard = selectedComponent.getField(
    "properties.style.asCard",
    viewport
  );

  let defaultInputType = selectedComponent.getField("attributes.type");

  const handleChange = (
    field: string,
    value: any,
    isValidForAllViewports: boolean = false
  ) => {
    updateComponent(selectedComponent.id, field, value, isValidForAllViewports);
  };

  return (
    <>
      {whitelist.includes("placeholder") && (
        <div className="grid grid-cols-2 gap-2 items-center">
          <Label className="text-xs text-gray-400">Placeholder</Label>
          <div className="flex flex-row items-center gap-2">
            <Input
              value={defaultInputPlaceholder}
              onChange={(e) =>
                handleChange("attributes.placeholder", e.target.value, true)
              }
            />
          </div>
        </div>
      )}
      {whitelist.includes("description") && (
        <div className="grid grid-cols-2 gap-2 items-center">
          <Label className="text-xs text-gray-400">Description</Label>
          <div className="flex flex-row items-center gap-2">
            <Input
              value={defaultInputDescription}
              onChange={(e) =>
                handleChange("description", e.target.value, true)
              }
            />
          </div>
        </div>
      )}
      {whitelist.includes("asCard") && (
        <div className="grid grid-cols-2 gap-2 items-center justify-between">
          <Label htmlFor="asCard" className="text-xs text-gray-400">
            As Card
          </Label>
          <div className="flex flex-row items-center gap-2">
            <ToggleGroupNav
              items={[
                { value: "yes", label: "yes" },
                { value: "no", label: "no" },
              ]}
              defaultValue={defaultValueAsCard}
              onValueChange={(value) =>
                handleChange("properties.style.asCard", value)
              }
              className="w-full"
            />
            <ViewportOverrideIndicator
              component={selectedComponent}
              field="properties.style.asCard"
            />
          </div>
        </div>
      )}
    </>
  );
}
