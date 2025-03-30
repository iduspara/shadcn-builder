import {
  cn,
  generateTWClassesForAllViewports,
  escapeHtml,
} from "@/lib/utils";
import { DesignPropertiesViews, FormRow } from "@/types/form-builder.types";
import { FormComponentModel } from "../Models/FormComponent";
import { HtmlGroup } from "../sidebar/groups/html-group";
import { GridGroup } from "../sidebar/groups/grid-group";
export function Text(component: FormComponentModel, row?: FormRow) {
  const colSpanClasses = generateTWClassesForAllViewports(component, "colSpan", row);
  const colStartClasses = generateTWClassesForAllViewports(
    component,
    "colStart"
  );

  return (
    <div
      key={component.id}
      className={cn(
        colSpanClasses,
        colStartClasses,
        component.getTWClasses("textAlign")
      )}
      dangerouslySetInnerHTML={{ __html: component.content || "" }}
    />
  );
}

type ReactCode = {
  code: string;
  dependencies: Record<string, string[]>;
};

export function getReactCode(component: FormComponentModel): ReactCode {
  return {
    code: `
    <div
      key="${component.id}"
      className="${escapeHtml(component.getTWClasses("textAlign"))}">
      ${component.content || ""}
    </div>
    `,
    dependencies: {

    },
  };
}

export const TextDesignProperties: DesignPropertiesViews = {
  base: null,
  grid: <GridGroup />,
  html: <HtmlGroup />,
  label: null,
  input: null,
  options: null,
  button: null,
};
