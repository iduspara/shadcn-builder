import { FormComponentStyles } from "@/types/FormComponent.types";
import { Viewports, FormRow } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";
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
      left: "@3xl:flex-row @3xl:gap-2 @3xl:space-y-0",
      right: "@3xl:flex-row @3xl:gap-2 @3xl:space-y-0 @3xl:flex-row-reverse",
      top: "@3xl:flex-col @3xl:gap-2 @3xl:space-y-0",
    },
    lg: {
      left: "@5xl:flex-row @5xl:gap-2 @5xl:space-y-0",
      right: "@5xl:flex-row @5xl:gap-2 @5xl:space-y-0 @5xl:flex-row-reverse",
      top: "@5xl:flex-col @5xl:gap-2 @5xl:space-y-0",
    },
  },
  visible: {
    sm: {
      yes: "flex",
      no: "hidden",
    },
    md: {
      yes: "@3xl:flex",
      no: "@3xl:hidden",
    },
    lg: {
      yes: "@5xl:flex",
      no: "@5xl:hidden",
    },
  },
  asCard: {
    sm: {
      yes: "rounded-md border p-4",
      no: "border-0 p-0",
    },
    md: {
      yes: "@3xl:rounded-md @3xl:border @3xl:p-4",
      no: "@3xl:border-0 @3xl:p-0",
    },  
    lg: {
      yes: "@5xl:rounded-md @5xl:border @5xl:p-4",
      no: "@5xl:border-0 @5xl:p-0",
    },
  },
  showLabel: {
    sm: {
      yes: "flex",
      no: "hidden",
    },
    md: {
      yes: "@3xl:flex",
      no: "@3xl:hidden",
    },
    lg: {
      yes: "@5xl:flex",
      no: "@5xl:hidden",
    },
  },
  labelAlign: {
    sm: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
    },
    md: {
      start: "@3xl:items-start",
      center: "@3xl:items-center",
      end: "@3xl:items-end",
    },
    lg: {
      start: "@5xl:items-start",
      center: "@5xl:items-center",
      end: "@5xl:items-end",
    },
  },
  textAlign: {
    sm: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    md: {
      left: "@3xl:text-left",
      center: "@3xl:text-center",
      right: "@3xl:text-right",
    },
    lg: {
      left: "@5xl:text-left",
      center: "@5xl:text-center",
      right: "@5xl:text-right",
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
      auto: "@3xl:col-auto",
      "1": "@3xl:col-span-1",
      "2": "@3xl:col-span-2",
      "3": "@3xl:col-span-3",
      "4": "@3xl:col-span-4",
      "5": "@3xl:col-span-5",
      "6": "@3xl:col-span-6",
      "7": "@3xl:col-span-7",
      "8": "@3xl:col-span-8",
      "9": "@3xl:col-span-9",
      "10": "@3xl:col-span-10",
      "11": "@3xl:col-span-11",
      "12": "@3xl:col-span-12",
    },
    lg: {
      auto: "@5xl:col-auto",
      "1": "@5xl:col-span-1",
      "2": "@5xl:col-span-2",
      "3": "@5xl:col-span-3",
      "4": "@5xl:col-span-4",
      "5": "@5xl:col-span-5",
      "6": "@5xl:col-span-6",
      "7": "@5xl:col-span-7",
      "8": "@5xl:col-span-8",
      "9": "@5xl:col-span-9",
      "10": "@5xl:col-span-10",
      "11": "@5xl:col-span-11",
      "12": "@5xl:col-span-12",
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
      auto: "@3xl:col-start-auto",
      "1": "@3xl:col-start-1",
      "2": "@3xl:col-start-2",
      "3": "@3xl:col-start-3",
      "4": "@3xl:col-start-4",
      "5": "@3xl:col-start-5",
      "6": "@3xl:col-start-6",
      "7": "@3xl:col-start-7",
      "8": "@3xl:col-start-8",
      "9": "@3xl:col-start-9",
      "10": "@3xl:col-start-10",
      "11": "@3xl:col-start-11",
      "12": "@3xl:col-start-12",
    },
    lg: {
      auto: "@5xl:col-start-auto",
      "1": "@5xl:col-start-1",
      "2": "@5xl:col-start-2",
      "3": "@5xl:col-start-3",
      "4": "@5xl:col-start-4",
      "5": "@5xl:col-start-5",
      "6": "@5xl:col-start-6",
      "7": "@5xl:col-start-7",
      "8": "@5xl:col-start-8",
      "9": "@5xl:col-start-9",
      "10": "@5xl:col-start-10",
      "11": "@5xl:col-start-11",
      "12": "@5xl:col-start-12",
    },
  },
  flexAlign: {
    sm: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
    },
    md: {
      start: "@3xl:items-start",
      center: "@3xl:items-center",
      end: "@3xl:items-end",
    },
    lg: {
      start: "@5xl:items-start",
      center: "@5xl:items-center",
      end: "@5xl:items-end",
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

    console.log(desktopOverride, tabletOverride);

    if (desktopOverride) {
      if (styleKey === "colSpan" && desktopOverride === "auto" && row) {
        const colSpan = Math.floor(12 / row?.components.length);
        classes.push(`@5xl:${transformStyleKeyToClassName(styleKey)}-${colSpan}`);
      } else if (styleMap[styleKey] && styleMap[styleKey]["lg"] && styleMap[styleKey]["lg"][desktopOverride]) {
        classes.push(styleMap[styleKey]["lg"][desktopOverride]);
      } else {
        classes.push(`@5xl:${desktopOverride}`);
      }
    }

    if (tabletOverride) {
      if (styleKey === "colSpan" && tabletOverride === "auto" && row) {
        const colSpan = Math.floor(12 / row?.components.length);
        classes.push(`@3xl:${transformStyleKeyToClassName(styleKey)}-${colSpan}`);
      } else if (styleMap[styleKey] && styleMap[styleKey]["md"] && styleMap[styleKey]["md"][tabletOverride]) {
        classes.push(styleMap[styleKey]["md"][tabletOverride]);
      } else {
        classes.push(`@3xl:${tabletOverride}`);
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
