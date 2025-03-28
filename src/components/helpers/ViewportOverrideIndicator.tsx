import { MonitorSmartphone } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FormComponentModel } from "@/components/form-builder/Models/FormComponent";

interface ViewportOverrideIndicatorProps {
  component: FormComponentModel;
  field: string;
  className?: string;
}

export function ViewportOverrideIndicator({
  component,
  field,
  className = "w-5 h-5",
}: ViewportOverrideIndicatorProps) {
  const getOverrideInfo = () => {
    if (!component.overrides) return null;

    const mobileValue = component.getField(field);
    const tabletValue = component.getField(field, "md");
    const desktopValue = component.getField(field, "lg");

    if (mobileValue === tabletValue && tabletValue === desktopValue) {
      return null;
    }
    
    return [
      `sm: ${mobileValue}`,
      `md: ${tabletValue}`,
      `lg: ${desktopValue}`,
    ]; 
  };

  const overrideInfo = getOverrideInfo();

  if (!overrideInfo) {
    return <MonitorSmartphone className={`text-gray-300 ${className}`} />;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <MonitorSmartphone
            className={`text-blue-500 cursor-help ${className}`}
          />
        </TooltipTrigger>
        <TooltipContent>
          <div className="font-mono text-sm whitespace-pre">
            {overrideInfo.join("\n")}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
