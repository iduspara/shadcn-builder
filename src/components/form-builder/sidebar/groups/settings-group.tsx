import { useFormBuilderStore } from "@/stores/form-builder-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroupNav } from "@/components/form-builder/ui/toggle-group-nav";
import { IconPickerDialog } from "../../dialogs/icon-picker-dialog";

type SettingOption = { value: string; label: string };

/**
 * A single editable setting. `path` is a FormComponentModel field path,
 * e.g. "properties.settings.min" or "content".
 */
export type SettingField =
  | { kind: "text"; path: string; label: string; placeholder?: string }
  | { kind: "number"; path: string; label: string; min?: number; step?: number }
  | { kind: "toggle"; path: string; label: string; options: SettingOption[] }
  | { kind: "select"; path: string; label: string; options: SettingOption[] }
  | { kind: "icon"; path: string; label: string };

export type SettingsGroupProps = {
  fields: SettingField[];
};

/** Declarative property editor for component-specific settings. */
export function SettingsGroup({ fields }: SettingsGroupProps) {
  const { updateComponent, selectedComponent } = useFormBuilderStore();

  if (!selectedComponent) {
    return null;
  }

  // Settings describe the component itself, not a viewport, so they always
  // apply to all viewports.
  const handleChange = (path: string, value: unknown) => {
    updateComponent(selectedComponent.id, path, value, true);
  };

  return (
    <div className="space-y-4">
      {fields.map((field) => {
        const value = selectedComponent.getField(field.path);
        return (
          <div key={field.path} className="grid grid-cols-2 gap-2 items-center">
            <Label className="text-xs text-gray-400">{field.label}</Label>
            <div className="flex flex-row items-center gap-2">
              {field.kind === "text" && (
                <Input
                  value={value ?? ""}
                  placeholder={field.placeholder}
                  onChange={(e) => handleChange(field.path, e.target.value)}
                />
              )}
              {field.kind === "number" && (
                <Input
                  type="number"
                  value={value ?? ""}
                  min={field.min}
                  step={field.step}
                  onChange={(e) =>
                    handleChange(
                      field.path,
                      e.target.value === "" ? undefined : Number(e.target.value)
                    )
                  }
                />
              )}
              {field.kind === "toggle" && (
                <ToggleGroupNav
                  name={field.path}
                  items={field.options}
                  defaultValue={String(value ?? field.options[0]?.value)}
                  onValueChange={(nextValue) =>
                    handleChange(field.path, nextValue)
                  }
                  className="w-full"
                />
              )}
              {field.kind === "select" && (
                <Select
                  items={field.options}
                  value={value ?? field.options[0]?.value}
                  onValueChange={(nextValue) =>
                    nextValue && handleChange(field.path, nextValue)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {field.kind === "icon" && (
                <IconPickerDialog
                  selectedIcon={value || undefined}
                  onSelect={(iconName) => handleChange(field.path, iconName)}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
