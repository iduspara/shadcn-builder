import { FormComponentStyles } from "@/types/FormComponent.types";
import { Viewports, FormRow } from "@/types/form-builder.types";
import { FormComponentModel } from "@/components/form-builder/Models/FormComponent";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const styleMap: Partial<Record<keyof FormComponentStyles, Record<Viewports, Record<string, string>>>> = {
  labelPosition: {
    sm: {
      left: "flex-row gap-2 space-y-0",
      right: "flex-row gap-2 space-y-0 flex-row-reverse",
      top: "flex-col gap-2 space-y-0",
    },
    md: {
      left: "md:flex-row md:gap-2 md:space-y-0",
      right: "md:flex-row md:gap-2 md:space-y-0 md:flex-row-reverse",
      top: "md:flex-col md:gap-2 md:space-y-0",
    },
    lg: {
      left: "lg:flex-row lg:gap-2 lg:space-y-0",
      right: "lg:flex-row lg:gap-2 lg:space-y-0 lg:flex-row-reverse",
      top: "lg:flex-col lg:gap-2 lg:space-y-0",
    },
  },
  visible: {
    sm: {
      yes: "flex",
      no: "hidden",
    },
    md: {
      yes: "md:flex",
      no: "md:hidden",
    },
    lg: {
      yes: "lg:flex",
      no: "lg:hidden",
    },
  },
  asCard: {
    sm: {
      yes: "rounded-md border p-4",
      no: "border-0 p-0",
    },
    md: {
      yes: "md:rounded-md md:border md:p-4",
      no: "md:border-0 md:p-0",
    },  
    lg: {
      yes: "lg:rounded-md lg:border lg:p-4",
      no: "lg:border-0 lg:p-0",
    },
  },
  showLabel: {
    sm: {
      yes: "flex",
      no: "hidden",
    },
    md: {
      yes: "md:flex",
      no: "md:hidden",
    },
    lg: {
      yes: "lg:flex",
      no: "lg:hidden",
    },
  },
  labelAlign: {
    sm: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
    },
    md: {
      start: "md:items-start",
      center: "md:items-center",
      end: "md:items-end",
    },
    lg: {
      start: "lg:items-start",
      center: "lg:items-center",
      end: "lg:items-end",
    },
  },
  textAlign: {
    sm: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    md: {
      left: "md:text-left",
      center: "md:text-center",
      right: "md:text-right",
    },
    lg: {
      left: "lg:text-left",
      center: "lg:text-center",
      right: "lg:text-right",
    },
  },
  colSpan: {
    sm: {
      auto: "col-auto",
      "1": "col-span-1",
      "2": "col-span-2",
      "3": "col-span-3",
      "4": "col-span-4",
      "5": "col-span-5",
      "6": "col-span-6",
      "7": "col-span-7",
      "8": "col-span-8",
      "9": "col-span-9",
      "10": "col-span-10",
      "11": "col-span-11",
      "12": "col-span-12",
    },
    md: {
      auto: "md:col-auto",
      "1": "md:col-span-1",
      "2": "md:col-span-2",
      "3": "md:col-span-3",
      "4": "md:col-span-4",
      "5": "md:col-span-5",
      "6": "md:col-span-6",
      "7": "md:col-span-7",
      "8": "md:col-span-8",
      "9": "md:col-span-9",
      "10": "md:col-span-10",
      "11": "md:col-span-11",
      "12": "md:col-span-12",
    },
    lg: {
      auto: "lg:col-auto",
      "1": "lg:col-span-1",
      "2": "lg:col-span-2",
      "3": "lg:col-span-3",
      "4": "lg:col-span-4",
      "5": "lg:col-span-5",
      "6": "lg:col-span-6",
      "7": "lg:col-span-7",
      "8": "lg:col-span-8",
      "9": "lg:col-span-9",
      "10": "lg:col-span-10",
      "11": "lg:col-span-11",
      "12": "lg:col-span-12",
    },
  },
  colStart: {
    sm: {
      auto: "col-start-auto",
      "1": "col-start-1",
      "2": "col-start-2",
      "3": "col-start-3",
      "4": "col-start-4",
      "5": "col-start-5",
      "6": "col-start-6",
      "7": "col-start-7",
      "8": "col-start-8",
      "9": "col-start-9",
      "10": "col-start-10",
      "11": "col-start-11",
      "12": "col-start-12",
    },
    md: {
      auto: "md:col-start-auto",
      "1": "md:col-start-1",
      "2": "md:col-start-2",
      "3": "md:col-start-3",
      "4": "md:col-start-4",
      "5": "md:col-start-5",
      "6": "md:col-start-6",
      "7": "md:col-start-7",
      "8": "md:col-start-8",
      "9": "md:col-start-9",
      "10": "md:col-start-10",
      "11": "md:col-start-11",
      "12": "md:col-start-12",
    },
    lg: {
      auto: "lg:col-start-auto",
      "1": "lg:col-start-1",
      "2": "lg:col-start-2",
      "3": "lg:col-start-3",
      "4": "lg:col-start-4",
      "5": "lg:col-start-5",
      "6": "lg:col-start-6",
      "7": "lg:col-start-7",
      "8": "lg:col-start-8",
      "9": "lg:col-start-9",
      "10": "lg:col-start-10",
      "11": "lg:col-start-11",
      "12": "lg:col-start-12",
    },
  },
  flexAlign: {
    sm: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
    },
    md: {
      start: "md:items-start",
      center: "md:items-center",
      end: "md:items-end",
    },
    lg: {
      start: "lg:items-start",
      center: "lg:items-center",
      end: "lg:items-end",
    },
  },
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const transformStyleKeyToClassName = (
  styleKey: keyof FormComponentStyles
) => {
  return styleKey.replace(/([A-Z])/g, "-$1").toLowerCase();
};

export const generateTWClassesFromStyleObject = (
  style: FormComponentStyles
) => {
  return Object.entries(style)
    .map(([key, value]) => {
      const transformedKey = transformStyleKeyToClassName(
        key as keyof FormComponentStyles
      );
      return `${transformedKey}-${value}`;
    })
    .join(" ");
};

export const generateTWClassesForAllViewports = (
  component: FormComponentModel,
  styleKey: keyof FormComponentStyles,
  row?: FormRow
) => {
  const classes: string[] = [];
  const defaultClasses = component.properties?.style?.[styleKey];

  if (defaultClasses) {
    if (styleKey === "colSpan" && defaultClasses === "auto" && row) {
      const colSpan = Math.floor(12 / row?.components.length);
      classes.push(`${transformStyleKeyToClassName(styleKey)}-${colSpan}`);
    } else if (styleMap[styleKey] && styleMap[styleKey]["sm"] && styleMap[styleKey]["sm"][defaultClasses]) {
        classes.push(styleMap[styleKey]["sm"][defaultClasses]);
    } else {
      classes.push(`${defaultClasses}`);
    }
  }

  const override = component.overrides;

  if (override) {
    // First try to get Desktop override
    const desktopOverride = override["lg"]?.properties?.style?.[styleKey];
    // If no Desktop override, try to get Tablet override
    const tabletOverride = override["md"]?.properties?.style?.[styleKey];

    if (desktopOverride) {
      if (styleKey === "colSpan" && desktopOverride === "auto" && row) {
        const colSpan = Math.floor(12 / row?.components.length);
        classes.push(`lg:${transformStyleKeyToClassName(styleKey)}-${colSpan}`);
      } else if (styleMap[styleKey] && styleMap[styleKey]["lg"] && styleMap[styleKey]["lg"][desktopOverride]) {
        classes.push(styleMap[styleKey]["lg"][desktopOverride]);
      } else {
        classes.push(`lg:${desktopOverride}`);
      }
    }

    if (tabletOverride) {
      if (styleKey === "colSpan" && tabletOverride === "auto" && row) {
        const colSpan = Math.floor(12 / row?.components.length);
        classes.push(`md:${transformStyleKeyToClassName(styleKey)}-${colSpan}`);
      } else if (styleMap[styleKey] && styleMap[styleKey]["md"] && styleMap[styleKey]["md"][tabletOverride]) {
        classes.push(styleMap[styleKey]["md"][tabletOverride]);
      } else {
        classes.push(`md:${tabletOverride}`);
      }
    }
  }

  return classes.join(" ");
};

export type EscapeHtmlWhitelist = "<" | ">" | "\"" | "'" | "&";

export const escapeHtml = (text: string, whitelist?: EscapeHtmlWhitelist[]): string => {

  if (!text) {
    return "";
  }

  if (!whitelist) {
    return text.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
  }

  if (whitelist.includes("<")) {
    text = text.replace(/</g, '&lt;');
  }
  if (whitelist.includes(">")) {
    text = text.replace(/>/g, '&gt;');
  }
  if (whitelist.includes("\"")) {
    text = text.replace(/"/g, '&quot;');
  }
  if (whitelist.includes("'")) {
    text = text.replace(/'/g, '&#039;');
  }
  if (whitelist.includes("&")) {
    text = text.replace(/&/g, '&amp;');
  }

  return text;
  
};
