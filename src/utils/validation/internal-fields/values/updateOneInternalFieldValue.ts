import { z } from "zod";
import { createOneInternalFieldValueSchema } from "./createOneInternalFieldValue";
import { readOneInternalFieldValueSchema } from "./readOneInternalFieldValue";

export const updateOneInternalFieldValueSchema = z.object({
  ...createOneInternalFieldValueSchema.shape,
  ...readOneInternalFieldValueSchema.shape,
});

export type UpdateOneInternalFieldValueInput = z.infer<
  typeof updateOneInternalFieldValueSchema
>;
