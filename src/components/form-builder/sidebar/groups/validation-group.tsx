import { useFormBuilderStore } from "@/stores/form-builder-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ToggleGroupNav } from "../../ui/toggle-group-nav";
import { useEffect, useCallback, useState } from "react";
import { FormComponentTypes } from "@/types/FormComponent.types";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type InputTypeValidationMap = {
  [key in FormComponentTypes]: string[];
};

const inputTypeValidationMap: Partial<InputTypeValidationMap> = {
  number: [
    "min",
    "max",
    "greater",
    "lower",
    "equals",
    "greaterEqual",
    "lowerEqual",
  ],
  input: ["minLength", "maxLength", "contains", "notContains"],
  textarea: ["minLength", "maxLength", "contains", "notContains"],
  email: ["contains", "notContains"],
  password: ["minLength", "maxLength"],
  tel: ["minLength", "maxLength"]
};

const VALIDATION_OPTIONS = [
  { value: "equals", label: "Equals" },
  { value: "notEquals", label: "Does not equal" },
  { value: "greater", label: "Greater than" },
  { value: "greaterEqual", label: "Greater or equal" },
  { value: "lower", label: "Less than" },
  { value: "lowerEqual", label: "Less or equal" },
  { value: "contains", label: "Contains" },
  { value: "notContains", label: "Does not contain" },
  { value: "minLength", label: "Min length" },
  { value: "maxLength", label: "Max length" },
  { value: "min", label: "Min value" },
  { value: "max", label: "Max value" },
];

export function ValidationGroup() {
  const { updateComponent, selectedComponent } = useFormBuilderStore();

  const validations = selectedComponent?.getField("validations") || {};

  // Convert validations object to array of conditions for UI
  const initialConditions = Object.entries(validations).map(
    ([type, value]) => ({ type, value: String(value) })
  );

  const [conditions, setConditions] = useState<
    { type: string; value: string }[]
  >(initialConditions.length ? initialConditions : []);

  const resetConditions = useCallback(() => {
    const newValidations = selectedComponent?.getField("validations") || {};
    const newConditions = Object.entries(newValidations).map(
      ([type, value]) => ({ type, value: String(value) })
    );

    setConditions(newConditions.length ? newConditions : []);
  }, [selectedComponent]);

  useEffect(() => {
    resetConditions();
  }, [selectedComponent?.id, resetConditions]);

  const type = selectedComponent?.type as FormComponentTypes;
  const allowedValidations = inputTypeValidationMap[type] || [];
  const filteredValidationOptions = VALIDATION_OPTIONS.filter((opt) =>
    allowedValidations.includes(opt.value)
  );

  const handleRequiredChange = (value: string) => {
    if (!selectedComponent) return;
    const newValidations = { ...validations, required: value };
    updateComponent(selectedComponent.id, "validations", newValidations, true);
  };

  // Sync local state with store
  const syncValidations = (
    newConditions: { type: string; value: string }[]
  ) => {
    if (!selectedComponent) return;
    const newValidations: Record<string, any> = {};
    newConditions.forEach((cond) => {
      newValidations[cond.type] = cond.value;
    });
    updateComponent(selectedComponent.id, "validations", newValidations, true);
  };

  const handleConditionChange = (
    idx: number,
    field: "type" | "value",
    value: string
  ) => {
    const updated = conditions.map((cond, i) =>
      i === idx ? { ...cond, [field]: value } : cond
    );
    setConditions(updated);
    syncValidations(updated);
  };

  const handleRemove = (idx: number) => {
    const updated = conditions.filter((_, i) => i !== idx);
    setConditions(updated);
    syncValidations(updated);
  };

  const handleAdd = () => {
    const firstFilteredCondition = filteredValidationOptions[0];
    const updated = [
      ...conditions,
      { type: firstFilteredCondition.value, value: "" },
    ];
    setConditions(updated);
  };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2 items-center">
        <Label className="text-xs text-gray-400 flex-1 inline-block">
          Required
        </Label>
        <div className="flex flex-row items-center gap-2">
          <ToggleGroupNav
            name="required"
            items={[
              { value: "yes", label: "yes" },
              { value: "no", label: "no" },
            ]}
            defaultValue={validations.required || "no"}
            className="w-full"
            onValueChange={handleRequiredChange}
          />
        </div>
      </div>
      {filteredValidationOptions.length > 0 && (
        <>
          {conditions.map((cond, idx) => {
            if (cond.type === "required") {
              return null;
            }
            return (
              <div key={idx} className="flex flex-col gap-2">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-1/2 border-t"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      AND
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 items-center">
                  <Select
                    value={cond.type}
                    onValueChange={(val) =>
                      val && handleConditionChange(idx, "type", val)
                    }
                  >
                    <SelectTrigger className="col-span-1 w-full">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredValidationOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="col-span-1 w-full flex flex-row items-center gap-2">
                    <Input
                      value={cond.value}
                      onChange={(e) =>
                        handleConditionChange(idx, "value", e.target.value)
                      }
                      placeholder="Value"
                      disabled={cond.type === "email" || cond.type === "url"}
                    />
                    <div
                      onClick={() => handleRemove(idx)}
                      className="cursor-pointer "
                    >
                      <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <Button
            variant="outline"
            className="w-full cursor-pointer mt-4"
            onClick={handleAdd}
            type="button"
          >
            + Add condition
          </Button>
        </>
      )}
    </div>
  );
}
