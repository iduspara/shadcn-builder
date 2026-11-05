import { FormComponentModel } from "@/models/FormComponent";
import { FormComponentValidationTypes } from "@/types/FormComponent.types";
import { z } from "zod";
import {
  getSliderConfig,
  getSliderDefaultValue,
} from "../form-components/form-slider";
import { getInputOtpConfig } from "../form-components/form-input-otp";
import {
  getToggleGroupConfig,
  getToggleGroupDefaultValue,
} from "../form-components/form-toggle-group";

type Validations = FormComponentValidationTypes;
type ValidationKey = keyof Validations;
type ValidationValue = Validations[ValidationKey];

const isNonZero = (value: ValidationValue) => value !== undefined && value !== 0;
const isSetBound = (value: ValidationValue) => isNonZero(value) && value !== "";

const shouldForceRequired = (validations: Validations): boolean => {
  if (!validations) return false;

  // If required is explicitly set to "no", only force it when every bound is set
  if (validations.required === "no") {
    return (
      [validations.min, validations.max].every(isSetBound) &&
      [validations.minLength, validations.maxLength].every(isNonZero)
    );
  }

  return validations.required === "yes";
};

/** Validation values that are unset, empty or 0 are ignored. */
const activeRules = <R extends { key: ValidationKey }>(
  rules: R[],
  validations: Validations
) => rules.filter((rule) => Boolean(validations[rule.key]));

// ----- number -----

type NumberMethod = "min" | "max" | "gt" | "lt" | "gte" | "lte";

interface NumberRule {
  key: ValidationKey;
  method: NumberMethod;
  message: (value: ValidationValue) => string;
}

const NUMBER_BOUND_RULES: NumberRule[] = [
  { key: "min", method: "min", message: (v) => `Must be at least ${v}` },
  { key: "max", method: "max", message: (v) => `Must be at most ${v}` },
  { key: "greater", method: "gt", message: (v) => `Must be greater than ${v}` },
  { key: "lower", method: "lt", message: (v) => `Must be less than ${v}` },
];

const NUMBER_INCLUSIVE_RULES: NumberRule[] = [
  { key: "greaterEqual", method: "gte", message: (v) => `Must be greater than or equal to ${v}` },
  { key: "lowerEqual", method: "lte", message: (v) => `Must be less than or equal to ${v}` },
];

const applyNumberRules = (
  schema: z.ZodNumber,
  rules: NumberRule[],
  validations: Validations
): z.ZodNumber =>
  activeRules(rules, validations).reduce((current, rule) => {
    const value = validations[rule.key];
    return current[rule.method](Number(value), { message: rule.message(value) });
  }, schema);

const numberRulesAsString = (rules: NumberRule[], validations: Validations): string =>
  activeRules(rules, validations)
    .map((rule) => {
      const value = validations[rule.key];
      return `.${rule.method}(${value}, { message: "${rule.message(value)}" })`;
    })
    .join("");

const createNumberSchema = (validations: Validations, isRequired: boolean): z.ZodTypeAny => {
  if (!isRequired) {
    return z.coerce.number().optional();
  }

  let schema = z.coerce
    .number({ error: "This field must be a number" })
    .min(1, { message: "This field is required" }) as z.ZodNumber;

  if (!validations) {
    return schema;
  }

  schema = applyNumberRules(schema, NUMBER_BOUND_RULES, validations);

  if (validations.equals) {
    const equalsValue = Number(validations.equals);
    schema = schema
      .gte(equalsValue, { message: `Must equal ${equalsValue}` })
      .lte(equalsValue, { message: `Must equal ${equalsValue}` });
  }

  if (validations.notEquals) {
    const notEqualsValue = Number(validations.notEquals);
    return schema.refine((val) => val !== notEqualsValue, {
      message: `Must not equal ${notEqualsValue}`,
    });
  }

  return applyNumberRules(schema, NUMBER_INCLUSIVE_RULES, validations);
};

const createNumberSchemaAsString = (validations: Validations, isRequired: boolean): string => {
  if (!isRequired) {
    // <number> pins the input type so it matches the output for useForm
    return `z.coerce.number<number>().optional()`;
  }

  const schema = `z.coerce.number<number>({
    invalid_type_error: "This field must be a number",
  }).min(1, { message: "This field is required" })`;

  if (!validations) {
    return schema;
  }

  let equals = "";
  if (validations.equals) {
    const equalsValue = Number(validations.equals);
    equals = `.gte(${equalsValue}, { message: "Must equal ${equalsValue}" }).lte(${equalsValue}, { message: "Must equal ${equalsValue}" })`;
  }

  let notEquals = "";
  if (validations.notEquals) {
    const notEqualsValue = Number(validations.notEquals);
    notEquals = `.refine((val) => val !== ${notEqualsValue}, { message: "Must not equal ${notEqualsValue}" })`;
  }

  return (
    schema +
    numberRulesAsString(NUMBER_BOUND_RULES, validations) +
    equals +
    notEquals +
    numberRulesAsString(NUMBER_INCLUSIVE_RULES, validations)
  );
};

// ----- string -----

const getLengthBound = (validations: Validations, key: "minLength" | "maxLength") =>
  validations[key] ? Number(validations[key]) : undefined;

interface StringRefineRule {
  key: "notContains" | "equals" | "notEquals";
  test: (val: string, expected: string) => boolean;
  message: (expected: string) => string;
  testCode: (expected: string) => string;
  messageCode: (expected: string) => string;
}

/** Refinements in evaluation order; the runtime schema applies only the first active one. */
const STRING_REFINE_RULES: StringRefineRule[] = [
  {
    key: "notContains",
    test: (val, expected) => !val.includes(expected),
    message: (expected) => `Must not contain "${expected}"`,
    testCode: (expected) => `!val.includes("${expected}")`,
    messageCode: (expected) => `Must not contain \\"${expected}\\"`,
  },
  {
    key: "equals",
    test: (val, expected) => val === expected,
    message: (expected) => `Must equal "${expected}"`,
    testCode: (expected) => `val === "${expected}"`,
    messageCode: (expected) => `Must equal \\"${expected}\\"`,
  },
  {
    key: "notEquals",
    test: (val, expected) => val !== expected,
    message: (expected) => `Must not equal "${expected}"`,
    testCode: (expected) => `val !== "${expected}"`,
    messageCode: (expected) => `Must not equal \\"${expected}\\"`,
  },
];

const applyFormatChecks = (schema: z.ZodString, validations: Validations): z.ZodString => {
  let result = schema;
  if (validations.email) {
    result = result.email({ message: "Invalid email address" });
  }
  if (validations.url) {
    result = result.url({ message: "Invalid URL" });
  }
  return result;
};

const createStringSchema = (validations: Validations, isRequired: boolean): z.ZodTypeAny => {
  let schema: z.ZodString = z.string();

  if (isRequired) {
    schema = schema.min(1, { message: "This field is required" });
  }

  if (!validations) {
    return schema;
  }

  const minLength = getLengthBound(validations, "minLength");
  if (minLength !== undefined) {
    schema = schema.min(minLength, { message: `Must be at least ${minLength} characters` });
  }

  const maxLength = getLengthBound(validations, "maxLength");
  if (maxLength !== undefined) {
    schema = schema.max(maxLength, { message: `Must be at most ${maxLength} characters` });
  }

  if (validations.contains) {
    const containsValue = validations.contains as string;
    schema = schema.includes(containsValue, { message: `Must contain "${containsValue}"` });
  }

  const [refineRule] = activeRules(STRING_REFINE_RULES, validations);
  if (refineRule) {
    const expected = validations[refineRule.key] as string;
    return schema.refine((val) => refineRule.test(val, expected), {
      message: refineRule.message(expected),
    });
  }

  return applyFormatChecks(schema, validations);
};

const createStringSchemaAsString = (validations: Validations, isRequired: boolean): string => {
  const parts = [`z.string()`];

  if (isRequired) {
    parts.push(`.min(1, { message: "This field is required" })`);
  }

  if (!validations) {
    return parts.join("");
  }

  const minLength = getLengthBound(validations, "minLength");
  if (minLength !== undefined) {
    parts.push(`.min(${minLength}, { message: "Must be at least ${minLength} characters" })`);
  }

  const maxLength = getLengthBound(validations, "maxLength");
  if (maxLength !== undefined) {
    parts.push(`.max(${maxLength}, { message: "Must be at most ${maxLength} characters" })`);
  }

  if (validations.contains) {
    const containsValue = validations.contains as string;
    parts.push(`.includes("${containsValue}", { message: "Must contain \\"${containsValue}\\"" })`);
  }

  for (const rule of activeRules(STRING_REFINE_RULES, validations)) {
    const expected = validations[rule.key] as string;
    parts.push(`.refine((val) => ${rule.testCode(expected)}, { message: "${rule.messageCode(expected)}" })`);
  }

  if (validations.email) {
    parts.push(`.email({ message: "Invalid email address" })`);
  }

  if (validations.url) {
    parts.push(`.url({ message: "Invalid URL" })`);
  }

  return parts.join("");
};

const createDateSchema = (
  validations: FormComponentValidationTypes,
  isRequired: boolean
): z.ZodTypeAny => {
  if (!isRequired) {
    return z.date().optional();
  }

  return z.date({
    error: "This field is required.",
  });
};

const createCheckboxGroupSchema = (
  validations: FormComponentValidationTypes,
  isRequired: boolean
): z.ZodTypeAny => {
  if (!isRequired) {
    return z.array(z.string()).optional();
  }

  return z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  });
};

const createCheckboxSchema = (
  validations: FormComponentValidationTypes,
  isRequired: boolean
): z.ZodTypeAny => {
  if (!isRequired) {
    return z.boolean().default(false).optional();
  }

  return z
    .boolean({
      error: "This field is required.",
    })
    .refine((value) => value === true, {
      message: "This field is required.",
    });
};

const createEmailSchema = (
  validations: FormComponentValidationTypes,
  isRequired: boolean
): z.ZodTypeAny => {
  let schema: z.ZodString = z.string();

  if (isRequired) {
    schema = schema.email({ message: "Invalid email address" }).min(1, { message: "This field is required" });
  }

  if (!validations) {
    return schema;
  }

  // Validate contains
  if (validations.contains && validations.contains !== "") {
    schema = schema.includes(validations.contains as string, {
      message: `Must contain "${validations.contains}"`,
    });
  }

  // Validate not contains
  if (validations.notContains && validations.notContains !== "") {
    return schema.refine(
      (val) => !val.includes(validations.notContains as string),
      { message: `Must not contain "${validations.notContains}"` }
    );
  }

  return schema;
};

const createDateSchemaAsString = (
  validations: FormComponentValidationTypes,
  isRequired: boolean
): string => {
  if (!isRequired) {
    return `z.date().optional()`;
  }

  return `z.date({
    error: "This field is required.",
  })`;
};

const createCheckboxGroupSchemaAsString = (
  validations: FormComponentValidationTypes,
  isRequired: boolean
): string => {
  if (!isRequired) {
    return `z.array(z.string()).optional()`;
  }

  return `z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  })`;
};

const createCheckboxSchemaAsString = (
  validations: FormComponentValidationTypes,
  isRequired: boolean
): string => {
  if (!isRequired) {
    return `z.boolean().default(false).optional()`;
  }

  return `z.boolean({
    error: "This field is required.",
  }).refine((value) => value === true, {
    message: "This field is required.",
  })`;
};

const createEmailSchemaAsString = (
  validations: FormComponentValidationTypes,
  isRequired: boolean
): string => {
  let schema = `z.string()`;

  if (isRequired) {
    schema += `.email({ message: "Invalid email address" }).min(1, { message: "This field is required" })`;
  }

  if (!validations) {
    return schema;
  }

  if (validations.contains && validations.contains !== "") {
    schema += `.includes("${validations.contains}", { message: "Must contain \\"${validations.contains}\\"" })`;
  }

  if (validations.notContains && validations.notContains !== "") {
    schema += `.refine((val) => !val.includes("${validations.notContains}"), { message: "Must not contain \\"${validations.notContains}\\"" })`;
  }

  return schema;
};

const createUrlSchemaAsString = (
  validations: FormComponentValidationTypes,
  isRequired: boolean
): string => {
  if (!isRequired) {
    return `z.string().url().optional()`;
  }

  return `z.string().url({ message: "Invalid URL" }).min(1, { message: "This field is required" })`;
};

const createUrlSchema = (
  validations: FormComponentValidationTypes,
  isRequired: boolean
): z.ZodTypeAny => {
  let schema: z.ZodString = z.string();

  if (isRequired) {
    schema = schema.url({ message: "Invalid URL" }).min(1, { message: "This field is required" });
  }

  return schema;
};


const createSliderSchema = (component: FormComponentModel): z.ZodTypeAny => {
  const { min, max, isRange } = getSliderConfig(component);
  const value = z.number().min(min).max(max);
  return isRange ? z.tuple([value, value]) : value;
};

const createSliderSchemaAsString = (component: FormComponentModel): string => {
  const { min, max, isRange } = getSliderConfig(component);
  const value = `z.number().min(${min}).max(${max})`;
  return isRange ? `z.tuple([${value}, ${value}])` : value;
};

const getOtpMessage = (length: number) => `Enter all ${length} characters`;

const UNSAFE_JS_CHAR_MAP: Record<string, string> = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "\t": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029",
};

const escapeUnsafeChars = (value: string): string =>
  value.replace(/[<>\/\\\b\f\n\r\t\0\u2028\u2029]/g, (char) => UNSAFE_JS_CHAR_MAP[char] ?? char);

const createInputOtpSchema = (
  component: FormComponentModel,
  isRequired: boolean
): z.ZodTypeAny => {
  const { length } = getInputOtpConfig(component);
  const message = getOtpMessage(length);
  return isRequired
    ? z.string().length(length, { message })
    : z.string().refine((val) => val === "" || val.length === length, { message });
};

const createInputOtpSchemaAsString = (
  component: FormComponentModel,
  isRequired: boolean
): string => {
  const { length } = getInputOtpConfig(component);
  const message = escapeUnsafeChars(JSON.stringify(getOtpMessage(length)));
  return isRequired
    ? `z.string().length(${length}, { message: ${message} })`
    : `z.string().refine((val) => val === "" || val.length === ${length}, { message: ${message} })`;
};

type DefaultValue = string | number | undefined | Date | object;

const SUBMIT_TYPES = new Set(["button", "submit-button", "reset-button"]);

const DEFAULT_VALUE_BY_TYPE: Partial<
  Record<string, (component: FormComponentModel, baseValue: DefaultValue) => DefaultValue>
> = {
  "checkbox-group": (component) =>
    component.options?.filter((option) => option.checked).map((option) => option.value),
  checkbox: (component) => component.getField("value") || false,
  switch: (component) => component.getField("value") || false,
  number: (_, baseValue) => +(baseValue as string | number),
  date: () => new Date(),
  slider: (component) => getSliderDefaultValue(component),
  "toggle-group": (component) => getToggleGroupDefaultValue(component),
};

/** Form fields only: content components and buttons have no value. */
const hasFormValue = (component: FormComponentModel) =>
  component.category !== "content" && !SUBMIT_TYPES.has(component.type);

export const getZodDefaultValues = (
  components: FormComponentModel[]
): Record<string, DefaultValue> => {
  const defaultValues: Record<string, DefaultValue> = {};

  components.filter(hasFormValue).forEach((component) => {
    const baseValue = component.getField("value") || "";
    const resolve = DEFAULT_VALUE_BY_TYPE[component.type];
    defaultValues[component.getField("attributes.id")] = resolve
      ? resolve(component, baseValue)
      : baseValue;
  });

  return defaultValues;
};

export const getZodDefaultValuesAsString = (
  components: FormComponentModel[]
) => {
  const defaultValues = getZodDefaultValues(components);
  const defaultValuesString = Object.entries(defaultValues)
    .map(([key, value]) => {
      const defaultValue = `"${value}"`;

      if (typeof value === "number") {
        return `"${key}": ${value}`;
      }

      if (typeof value === "boolean") {
        return `"${key}": ${value}`;
      }

      if (typeof value === "object") {
        if (value instanceof Date) {
          return `"${key}": new Date("${value.toISOString()}")`;
        }
        return `"${key}": ${JSON.stringify(value)}`;
      }

      return `"${key}": ${defaultValue}`;
    })
    .join(",\n");

  return `${defaultValuesString}`;
};

interface SchemaContext {
  component: FormComponentModel;
  validations: Validations;
  isRequired: boolean;
}

interface SchemaBuilder {
  runtime: (ctx: SchemaContext) => z.ZodTypeAny;
  code: (ctx: SchemaContext) => string;
}

const fromValidations = (
  runtime: (validations: Validations, isRequired: boolean) => z.ZodTypeAny,
  code: (validations: Validations, isRequired: boolean) => string
): SchemaBuilder => ({
  runtime: ({ validations, isRequired }) => runtime(validations, isRequired),
  code: ({ validations, isRequired }) => code(validations, isRequired),
});

const checkboxBuilder = fromValidations(createCheckboxSchema, createCheckboxSchemaAsString);
const optionalStringBuilder: SchemaBuilder = {
  runtime: () => z.string().optional(),
  code: () => `z.string().optional()`,
};

const SCHEMA_BUILDERS: Record<string, SchemaBuilder> = {
  number: fromValidations(createNumberSchema, createNumberSchemaAsString),
  date: fromValidations(createDateSchema, createDateSchemaAsString),
  slider: {
    runtime: ({ component }) => createSliderSchema(component),
    code: ({ component }) => createSliderSchemaAsString(component),
  },
  "input-otp": {
    runtime: ({ component, isRequired }) => createInputOtpSchema(component, isRequired),
    code: ({ component, isRequired }) => createInputOtpSchemaAsString(component, isRequired),
  },
  "checkbox-group": fromValidations(createCheckboxGroupSchema, createCheckboxGroupSchemaAsString),
  checkbox: checkboxBuilder,
  switch: checkboxBuilder,
  email: fromValidations(createEmailSchema, createEmailSchemaAsString),
  url: fromValidations(createUrlSchema, createUrlSchemaAsString),
  button: optionalStringBuilder,
  "submit-button": optionalStringBuilder,
  "reset-button": optionalStringBuilder,
  string: fromValidations(createStringSchema, createStringSchemaAsString),
};

const getSchemaBuilder = (component: FormComponentModel): SchemaBuilder => {
  // A multi-select toggle group stores an array, like a checkbox group
  if (component.type === "toggle-group" && getToggleGroupConfig(component).multiple) {
    return SCHEMA_BUILDERS["checkbox-group"];
  }
  return SCHEMA_BUILDERS[component.type] ?? SCHEMA_BUILDERS.string;
};

const createSchemaForComponent = (
  component: FormComponentModel,
  validations: Validations,
  isRequired: boolean,
  asString?: boolean
): z.ZodTypeAny | string => {
  const builder = getSchemaBuilder(component);
  const ctx = { component, validations, isRequired };
  return asString ? builder.code(ctx) : builder.runtime(ctx);
};

export const getZodSchemaForComponents = (
  components: FormComponentModel[],
  asString: boolean = false
): z.ZodObject<Record<string, z.ZodTypeAny>> | string => {
  const schema: Record<string, z.ZodTypeAny> = {};

  components.forEach((component) => {
    if (component.category === "content") {
      return;
    }

    const validations = component.getField("validations");
    const isRequired = shouldForceRequired(validations);
    const componentId = component.getField("attributes.id");

    schema[componentId] = createSchemaForComponent(
      component,
      validations,
      isRequired,
      asString
    ) as z.ZodTypeAny;
  });

  if (asString) {
    const stringSchema = Object.entries(schema)
      .map(([key, value]) => {
        return `"${key}": ${value}`;
      })
      .join(",\n");

    return `z.object({${stringSchema}})`;
  }

  return z.object(schema);
};
