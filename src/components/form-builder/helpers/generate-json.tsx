import { FormRow } from "@/types/form-builder.types";
export const generateJsonSchema = (rows: FormRow[]) => {
  return {
    rows,
    validation: {},
    };
  };
