import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import type { z } from "zod";
import {
  getZodDefaultValues,
  getZodDefaultValuesAsString,
  getZodSchemaForComponents,
} from "@/components/form-builder/helpers/zod";
import { FormComponentModel } from "@/models/FormComponent";
import type { FormComponentModelInput, FormComponentValidationTypes } from "@/types/FormComponent.types";
import { FIXED_NOW, loadTemplates, toModels } from "./fixtures";
import { componentVariants } from "./component-variants";

const TYPES = [
  "input", "textarea", "password", "tel", "number", "email", "url", "date",
  "checkbox", "switch", "checkbox-group", "select", "radio", "slider",
  "input-otp", "toggle-group", "toggle-group-multiple", "button",
] as const;

const KEYS: Record<keyof FormComponentValidationTypes, (string | number | boolean)[]> = {
  required: [],
  min: [3, "", 0],
  max: [8],
  minLength: [2, 0],
  maxLength: [5],
  contains: ["a"],
  notContains: ["z"],
  greater: [2],
  lower: [9],
  equals: [5, "abc"],
  notEquals: [5, "abc"],
  greaterEqual: [4],
  lowerEqual: [6],
  email: [true],
  url: [true],
};

function validationCases(): FormComponentValidationTypes[] {
  const singles = Object.entries(KEYS).flatMap(([key, values]) =>
    values.map((value) => ({ [key]: value }) as FormComponentValidationTypes)
  );
  const pairs: FormComponentValidationTypes[] = [];
  for (let i = 0; i < singles.length; i++)
    for (let j = i + 1; j < singles.length; j++) pairs.push({ ...singles[i], ...singles[j] });
  const all = Object.assign({}, ...Object.entries(KEYS).map(([k, v]) => (v.length ? { [k]: v[0] } : {})));
  const base = [undefined, {}, ...singles, ...pairs, all] as (FormComponentValidationTypes | undefined)[];
  return base.flatMap((v) =>
    v === undefined
      ? [v as never]
      : [v, { ...v, required: "yes" as const }, { ...v, required: "no" as const }]
  );
}

const PROBES: unknown[] = [
  undefined, null, "", "a", "ab", "abc", "zebra", "hello", "aaaaaaaaaa", "5", "12",
  "test@example.com", "not-an-email", "https://example.com", "1234", "ab12", "123456",
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100, -1,
  true, false, [], ["a"], ["a", "b"], ["a", "b", "c", "d", "e", "f"], [5], [3, 40],
  new Date("2025-01-01T00:00:00.000Z"), "2025-01-01",
];

/** "." = accepted unchanged, "~x" = accepted as x, "E<n>" = rejected with legend message n. */
function compactProbes(schema: z.ZodTypeAny, legend: string[]) {
  return PROBES.map((probe) => {
    const result = schema.safeParse(probe);
    if (result.success) {
      const out = JSON.stringify(result.data);
      return out === JSON.stringify(probe) ? "." : `~${out}`;
    }
    const message = result.error.issues.map((i) => i.message).join("|");
    let id = legend.indexOf(message);
    if (id < 0) id = legend.push(message) - 1;
    return `E${id}`;
  }).join(" ");
}

function describeProbe(schema: z.ZodTypeAny, probe: unknown) {
  const result = schema.safeParse(probe);
  return result.success
    ? `ok:${JSON.stringify(result.data)}`
    : `err:${result.error.issues.map((i) => i.message).join("|")}`;
}

function makeComponent(type: (typeof TYPES)[number], validations?: FormComponentValidationTypes) {
  const realType = type === "toggle-group-multiple" ? "toggle-group" : type;
  const input: FormComponentModelInput = {
    id: "field",
    type: realType as FormComponentModelInput["type"],
    category: "form",
    label: "Field",
    label_info: "",
    icon: "Type",
    attributes: { id: "field" },
    options: [{ label: "A", value: "a" }, { label: "B", value: "b" }] as never,
    properties: {
      settings: type === "toggle-group-multiple" ? { multiple: "yes" } : type === "slider" ? { min: 2, max: 40, step: 2 } : {},
    },
    validations,
  };
  return new FormComponentModel(input);
}

describe("zod schemas", () => {
  for (const type of TYPES) {
    it(type, () => {
      const legend: string[] = [];
      const lines = validationCases().map((validations) => {
        const component = makeComponent(type, validations);
        const runtime = (getZodSchemaForComponents([component]) as z.ZodObject).shape.field;
        const asString = (getZodSchemaForComponents([component], true) as string)
          .replace(/^z\.object\(\{"field": /, "")
          .replace(/\}\)$/, "");
        return `${JSON.stringify(validations ?? null)}\n  ${asString}\n  ${compactProbes(runtime, legend)}`;
      });
      const probes = PROBES.map((p) => (p instanceof Date ? "Date" : JSON.stringify(p) ?? "undefined"));
      expect(
        ["probes: " + probes.join(" "), ...legend.map((m, i) => `E${i}: ${m}`), ...lines].join("\n")
      ).toMatchSnapshot();
    });
  }
});

describe("zod default values", () => {
  beforeAll(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(FIXED_NOW);
  });
  afterAll(() => vi.useRealTimers());

  it("component variants", () => {
    const models = componentVariants().map((v) => v.model);
    expect(getZodDefaultValues(models)).toMatchSnapshot();
    expect(getZodDefaultValuesAsString(models)).toMatchSnapshot();
    expect(getZodSchemaForComponents(models, true)).toMatchSnapshot();
  });

  for (const template of loadTemplates()) {
    it(`template ${template.name}`, () => {
      const models = toModels(template.components);
      const schema = getZodSchemaForComponents(models) as z.ZodObject;
      expect({
        defaults: getZodDefaultValues(models),
        emptyParse: describeProbe(schema, {}),
        defaultsParse: describeProbe(schema, getZodDefaultValues(models)),
      }).toMatchSnapshot();
    });
  }
});
