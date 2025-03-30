import { Input } from "@/components/ui/input";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { PlusIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function OptionsGroup() {
  const { updateComponent, selectedComponent, viewport } =
    useFormBuilderStore();

  if (!selectedComponent) {
    return null;
  }

  const handleChange = (
    field: string,
    value: any,
    isValidForAllViewports: boolean = false
  ) => {
    if (selectedComponent) {
      updateComponent(
        selectedComponent.id,
        field,
        value,
        isValidForAllViewports
      );
    }
  };

  return (
    <>
      {selectedComponent.options && selectedComponent.options.length !== 0 && (
        <div className="grid grid-cols-2 text-sm text-gray-400">
          <span className="ml-9">value</span>
          <span>label</span>
        </div>
      )}
      {selectedComponent.options?.map((option: any, index: number) => (
        <div key={index} className="flex items-center space-x-2">
          <Checkbox
            id={`option-${index}-checked`}
            checked={option.checked}
            onCheckedChange={(checked) =>
              handleChange(
                "options",
                [
                  ...(selectedComponent.options ?? []).slice(0, index),
                  { ...option, checked },
                  ...(selectedComponent.options ?? []).slice(index + 1),
                ],
                true
              )
            }
          />
          <Input
            value={option.value}
            onChange={(e) =>
              handleChange(
                "options",
                [
                  ...(selectedComponent.options ?? []).slice(0, index),
                  { ...option, value: e.target.value },
                  ...(selectedComponent.options ?? []).slice(index + 1),
                ],
                true
              )
            }
            placeholder="Option value"
          />
          <Input
            value={option.label}
            onChange={(e) =>
              handleChange(
                "options",
                [
                  ...(selectedComponent.options ?? []).slice(0, index),
                  { ...option, label: e.target.value },
                  ...(selectedComponent.options ?? []).slice(index + 1),
                ],
                true
              )
            }
            placeholder="Option label"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              handleChange(
                "options",
                selectedComponent.options?.filter(
                  (_: any, i: number) => i !== index
                ),
                true
              )
            }
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() =>
          handleChange(
            "options",
            [
              ...(selectedComponent.options ?? []),
              {
                label: "Demo-" + (selectedComponent.options?.length ?? 0),
                value: "demo-" + (selectedComponent.options?.length ?? 0),
                checked: false,
              },
            ],
            true
          )
        }
      >
        <PlusIcon className="mr-2 h-4 w-4" />
        Add Option
      </Button>
    </>
  );
}
