import { Input } from "@/components/ui/input";
import { useFormBuilderStore } from "@/stores/form-builder-store";

export const FormTitleInput = () => {
  const formTitle = useFormBuilderStore((state) => state.formTitle);
  const updateFormTitle = useFormBuilderStore((state) => state.updateFormTitle);
  return (
    <Input
      value={formTitle}
      type="text"
      className="h-8 max-w-50 outline-none focus-visible:ring-0 focus-visible:border-dashed active:ring-0 border-dashed bg-background dark:bg-transparent ring-0"
      onChange={(e) => updateFormTitle(e.target.value || "Untitled Form")}
    />
  );
};
