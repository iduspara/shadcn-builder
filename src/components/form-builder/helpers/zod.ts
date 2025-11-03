import { FormComponentModel } from "@/models/FormComponent";
import { FormComponentValidationTypes } from "@/types/FormComponent.types";
import { z } from "zod";

export const shouldForceRequired = (
  validations: FormComponentValidationTypes
): boolean => {
  if (!validations) return false;

  // If required is explicitly set to "no", check for min/max validations
  if (validations.required === "no") {
    return (
      validations.min !== undefined &&
      validations.min !== 0 &&
      validations.min !== "" &&
      validations.max !== undefined &&
      validations.max !== 0 &&
      validations.max !== "" &&
      validations.minLength !== undefined &&
      validations.minLength !== 0 &&
      validations.maxLength !== undefined &&
      validations.maxLength !== 0
    );
  }

  return validations.required === "yes";
};

const createNumberSchema = (
  validations: FormComponentValidationTypes,
  isRequired: boolean
): z.ZodTypeAny => {
  if (!isRequired) {
    return z.coerce.number().optional();
  }

  let schema = z.coerce
    .number({
      error: "This field must be a number",
    })
    .min(1, { message: "This field is required" });

  if (!validations) {
    return schema;
  }

  if (validations.min && validations.min !== "") {
    schema = schema.min(Number(validations.min), {
      message: `Must be at least ${validations.min}`,
    });
  }

  if (validations.max && validations.max !== "") {
    schema = schema.max(Number(validations.max), {
      message: `Must be at most ${validations.max}`,
    });
  }

  if (validations.greater && validations.greater !== "") {
    schema = schema.gt(Number(validations.greater), {
      message: `Must be greater than ${validations.greater}`,
    });
  }

  if (validations.lower && validations.lower !== "") {
    schema = schema.lt(Number(validations.lower), {
      message: `Must be less than ${validations.lower}`,
    });
  }

  if (validations.equals && validations.equals !== "") {
    const equalsValue = Number(validations.equals);
    schema = schema
      .gte(equalsValue, { message: `Must equal ${equalsValue}` })
      .lte(equalsValue, { message: `Must equal ${equalsValue}` });
  }

  if (validations.notEquals && validations.notEquals !== "") {
    const notEqualsValue = Number(validations.notEquals);
    return schema.refine((val) => val !== notEqualsValue, {
      message: `Must not equal ${notEqualsValue}`,
    });
  }

  if (validations.greaterEqual && validations.greaterEqual !== "") {
    schema = schema.gte(Number(validations.greaterEqual), {
      message: `Must be greater than or equal to ${validations.greaterEqual}`,
    });
  }

  if (validations.lowerEqual && validations.lowerEqual !== "") {
    schema = schema.lte(Number(validations.lowerEqual), {
      message: `Must be less than or equal to ${validations.lowerEqual}`,
    });
  }

  return schema;
};

const createStringSchema = (
  validations: FormComponentValidationTypes,
  isRequired: boolean
): z.ZodTypeAny => {
  let schema: z.ZodString = z.string();

  if (isRequired) {
    schema = schema.min(1, { message: "This field is required" });
  }

  if (!validations) {
    return schema;
  }

  // Validate min and max length
  if (validations.minLength && validations.minLength !== "") {
    const minLength = Number(validations.minLength);
    schema = schema.min(minLength, {
      message: `Must be at least ${minLength} characters`,
    });
  }
  
  if (validations.maxLength && validations.maxLength !== "") {
    const maxLength = Number(validations.maxLength);
    schema = schema.max(maxLength, {
      message: `Must be at most ${maxLength} characters`,
    });
  }

  // Validate contains
  if (validations.contains && validations.contains !== "") {
    const containsValue = validations.contains as string;
    schema = schema.includes(containsValue, {
      message: `Must contain "${containsValue}"`,
    });
  }

  // Validate not contains
  if (validations.notContains && validations.notContains !== "") {
    const notContainsValue = validations.notContains as string;
    return schema.refine(
      (val) => !val.includes(notContainsValue),
      { message: `Must not contain "${notContainsValue}"` }
    );
  }

  // Validate equals
  if (validations.equals && validations.equals !== "") {
    const equalsValue = validations.equals as string;
    return schema.refine((val) => val === equalsValue, {
      message: `Must equal "${equalsValue}"`,
    });
  }

  // Validate not equals
  if (validations.notEquals && validations.notEquals !== "") {
    const notEqualsValue = validations.notEquals as string;
    return schema.refine((val) => val !== notEqualsValue, {
      message: `Must not equal "${notEqualsValue}"`,
    });
  }

  // Validate email
  if (validations.email) {
    schema = schema.email({ message: "Invalid email address" });
  }

  // Validate URL
  if (validations.url) {
    schema = schema.url({ message: "Invalid URL" });
  }

  return schema;
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

const createNumberSchemaAsString = (
  validations: FormComponentValidationTypes,
  isRequired: boolean
): string => {
  if (!isRequired) {
    return `z.coerce.number().optional()`;
  }

  let schema = `z.coerce.number({
    invalid_type_error: "This field must be a number",
  }).min(1, { message: "This field is required" })`;

  if (!validations) {
    return schema;
  }

  if (validations.min && validations.min !== "") {
    schema += `.min(${validations.min}, { message: "Must be at least ${validations.min}" })`;
  }

  if (validations.max && validations.max !== "") {
    schema += `.max(${validations.max}, { message: "Must be at most ${validations.max}" })`;
  }

  if (validations.greater && validations.greater !== "") {
    schema += `.gt(${validations.greater}, { message: "Must be greater than ${validations.greater}" })`;
  }

  if (validations.lower && validations.lower !== "") {
    schema += `.lt(${validations.lower}, { message: "Must be less than ${validations.lower}" })`;
  }

  if (validations.equals && validations.equals !== "") {
    const equalsValue = Number(validations.equals);
    schema += `.gte(${equalsValue}, { message: "Must equal ${equalsValue}" }).lte(${equalsValue}, { message: "Must equal ${equalsValue}" })`;
  }

  if (validations.notEquals && validations.notEquals !== "") {
    const notEqualsValue = Number(validations.notEquals);
    schema += `.refine((val) => val !== ${notEqualsValue}, { message: "Must not equal ${notEqualsValue}" })`;
  }

  if (validations.greaterEqual && validations.greaterEqual !== "") {
    schema += `.gte(${validations.greaterEqual}, { message: "Must be greater than or equal to ${validations.greaterEqual}" })`;
  }

  if (validations.lowerEqual && validations.lowerEqual !== "") {
    schema += `.lte(${validations.lowerEqual}, { message: "Must be less than or equal to ${validations.lowerEqual}" })`;
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

const createStringSchemaAsString = (
  validations: FormComponentValidationTypes,
  isRequired: boolean
): string => {

  let schema = `z.string()`;

  if (isRequired) {
    schema += `.min(1, { message: "This field is required" })`;
  }

  if (!validations) {
    return schema;
  }
  
  if (!validations) {
    return schema;
  }

  // Validate min and max length
  if (validations.minLength && validations.minLength !== "") {
    const minLength = Number(validations.minLength);
    schema += `.min(${minLength}, { message: "Must be at least ${minLength} characters" })`;
  }

  if (validations.maxLength && validations.maxLength !== "") {
    const maxLength = Number(validations.maxLength);
    schema += `.max(${maxLength}, { message: "Must be at most ${maxLength} characters" })`;
  }

  // Validate contains
  if (validations.contains && validations.contains !== "") {
    const containsValue = validations.contains as string;
    schema += `.includes("${containsValue}", { message: "Must contain \\"${containsValue}\\"" })`;
  }

  // Validate not contains
  if (validations.notContains && validations.notContains !== "") {
    const notContainsValue = validations.notContains as string;
    schema += `.refine((val) => !val.includes("${notContainsValue}"), { message: "Must not contain \\"${notContainsValue}\\"" })`;
  }

  // Validate equals
  if (validations.equals && validations.equals !== "") {
    const equalsValue = validations.equals as string;
    schema += `.refine((val) => val === "${equalsValue}", { message: "Must equal \\"${equalsValue}\\"" })`;
  }

  // Validate not equals
  if (validations.notEquals && validations.notEquals !== "") {
    const notEqualsValue = validations.notEquals as string;
    schema += `.refine((val) => val !== "${notEqualsValue}", { message: "Must not equal \\"${notEqualsValue}\\"" })`;
  }

  // Validate email
  if (validations.email) {
    schema += `.email({ message: "Invalid email address" })`;
  }

  // Validate URL
  if (validations.url) {
    schema += `.url({ message: "Invalid URL" })`;
  }

  return schema;
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


export const getZodDefaultValues = (
  components: FormComponentModel[]
): Record<string, string | number | undefined | Date | object> => {
  const defaultValues: Record<string, string | number | undefined | Date | object> = {};

  components.forEach((component) => {
    if (
      component.type === "button" ||
      component.type === "submit-button" ||
      component.type === "reset-button"
    ) {
      return;
    }

    const componentId = component.getField("attributes.id");

    let defaultValue = component.getField("value") || "";

    if (component.type === "checkbox-group") {
      const selectedOptions = component.options?.filter(
        (option) => option.checked
      );
      defaultValue = selectedOptions?.map((option) => option.value);
    }

    if (component.type === "checkbox" || component.type === "switch") {
      defaultValue = component.getField("value") || false;
    }

    if (component.type === "number") {
      defaultValue = +defaultValue;
    }

    if (component.type === "date") {
      defaultValue = new Date();
    }

    defaultValues[componentId] = defaultValue;
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

const createSchemaForComponent = (
  component: FormComponentModel,
  validations: FormComponentValidationTypes,
  isRequired: boolean,
  asString?: boolean
): z.ZodTypeAny | string => {
  if (component.type === "number") {
    return asString
      ? createNumberSchemaAsString(validations, isRequired)
      : createNumberSchema(validations, isRequired);
  }

  if (component.type === "date") {
    return asString
      ? createDateSchemaAsString(validations, isRequired)
      : createDateSchema(validations, isRequired);
  }

  if (component.type === "checkbox-group") {
    return asString
      ? createCheckboxGroupSchemaAsString(validations, isRequired)
      : createCheckboxGroupSchema(validations, isRequired);
  }

  if (component.type === "checkbox" || component.type === "switch") {
    return asString
      ? createCheckboxSchemaAsString(validations, isRequired)
      : createCheckboxSchema(validations, isRequired);
  }

  if (component.type === "email") {
    return asString
      ? createEmailSchemaAsString(validations, isRequired)
      : createEmailSchema(validations, isRequired);
  }

  if (component.type === "url") {
    return asString
      ? createUrlSchemaAsString(validations, isRequired)
      : createUrlSchema(validations, isRequired);
  }

  if (component.type === "button" || component.type === "submit-button" || component.type === "reset-button") {
    return asString
      ? `z.string().optional()`
      : z.string().optional();
  }

  return asString
    ? createStringSchemaAsString(validations, isRequired)
    : createStringSchema(validations, isRequired);
};

export const getZodSchemaForComponents = (
  components: FormComponentModel[],
  asString: boolean = false
): z.ZodObject<Record<string, z.ZodTypeAny>> | string => {
  const schema: Record<string, z.ZodTypeAny> = {};

  components.forEach((component) => {
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
