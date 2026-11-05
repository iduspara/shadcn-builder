import { FormComponentStyles } from "@/types/FormComponent.types";
import { Viewports } from "@/types/form-builder.types";
import { FormComponentModel } from "@/models/FormComponent";

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
      yes: "block",
      no: "hidden",
    },
    md: {
      yes: "@3xl:block",
      no: "@3xl:hidden",
    },
    lg: {
      yes: "@5xl:block",
      no: "@5xl:hidden",
    },
  },
  asCard: {
    sm: {
      yes: "rounded-md border p-4 space-x-2",
      no: "border-0 p-0",
    },
    md: {
      yes: "@3xl:rounded-md @3xl:border @3xl:p-4 @3xl:space-x-2",
      no: "@3xl:border-0 @3xl:p-0",
    },  
    lg: {
      yes: "@5xl:rounded-md @5xl:border @5xl:p-4 @5xl:space-x-2",
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

export { cn } from "cn";

const transformStyleKeyToClassName = (
  styleKey: keyof FormComponentStyles
) => {
  return styleKey.replace(/([A-Z])/g, "-$1").toLowerCase();
};

const generateTWClassesFromStyleObject = (
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
) => {
  const classes: string[] = [];
  const defaultClasses = component.properties?.style?.[styleKey];

  if (defaultClasses) {
    if (styleMap[styleKey] && styleMap[styleKey]["sm"] && styleMap[styleKey]["sm"][defaultClasses]) {
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
      if (styleMap[styleKey] && styleMap[styleKey]["lg"] && styleMap[styleKey]["lg"][desktopOverride]) {
        classes.push(styleMap[styleKey]["lg"][desktopOverride]);
      } else {
        classes.push(`@5xl:${desktopOverride}`);
      }
    }

    if (tabletOverride) {
      if (styleMap[styleKey] && styleMap[styleKey]["md"] && styleMap[styleKey]["md"][tabletOverride]) {
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

export const replaceBrTags = (text: string): string => {
  return text.replace(/<br\s*\/?>/g, '<br />');
};

export const replaceClassWithClassName = (text: string): string => {
  return text.replace(/class="([^"]+)"/g, (match, p1) => {
    return `className="${p1}"`;
  });
};

const convertStyleToStyleObject = (style: string): Record<string, string> => {
  if (!style) return {};

  // Split the style string by semicolons and filter out empty strings
  const stylePairs = style.split(';').filter(Boolean);

  return stylePairs.reduce((acc, pair) => {
    // Split each pair by colon and trim whitespace
    const [property, value] = pair.split(':').map(str => str.trim());
    
    if (property && value) {
      // Convert CSS property to camelCase (e.g., text-align -> textAlign)
      const camelCaseProperty = property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      acc[camelCaseProperty] = value;
    }
    
    return acc;
  }, {} as Record<string, string>);
};

export const replaceStyleStringWithObject = (style: string): string => {
  return style.replace(/style="([^"]+)"/g, (match, p1) => {
    return `style={${JSON.stringify(convertStyleToStyleObject(p1))}}`;
  });

}


export const getGridRows = (
  items: FormComponentModel[],
  viewport: Viewports
): FormComponentModel[][] => {
  const rows: FormComponentModel[][] = [];
  let currentRow: FormComponentModel[] = [];
  let currentRowSpan = 0;

  items.forEach((item) => {
    const colSpan = +item.getField("properties.style.colSpan", viewport) || 12;

    // If adding this item would exceed 12 columns, start a new row
    if (currentRowSpan + colSpan > 12) {
      if (currentRow.length > 0) {
        rows.push([...currentRow]);
      }
      currentRow = [item];
      currentRowSpan = colSpan;
    } else {
      currentRow.push(item);
      currentRowSpan += colSpan;
    }
  });

  // Add the last row if it has items
  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  return rows;
};

export const updateColSpans = (
  updateItems: FormComponentModel[]
): { id: string; span: number }[] => {
  if (!updateItems.length) return [];

  const totalColumns = 12;
  const itemCount = updateItems.length;

  // Calculate base span and remainder
  const baseSpan = Math.floor(totalColumns / itemCount);
  const remainder = totalColumns % itemCount;

  const adjustedSpans: { id: string; span: number }[] = [];

  // Distribute spans equally, with remainder distributed to first few items
  updateItems.forEach((item, index) => {
    if (!item) return;
    // Add one extra column to the first 'remainder' items
    const span = index < remainder ? baseSpan + 1 : baseSpan;
    adjustedSpans.push({ id: item.id, span });
  });

  return adjustedSpans;
}
