import type { z } from "zod";
import { createOneInternalFieldValueSchema } from "./createOneInternalFieldValue";
import { readOneInternalFieldValueSchema } from "./readOneInternalFieldValue";

export const updateOneInternalFieldValueSchema =
  createOneInternalFieldValueSchema.extend({
    ...readOneInternalFieldValueSchema.shape,
  });

export type UpdateOneInternalFieldValueInput = z.infer<
  typeof updateOneInternalFieldValueSchema
>;
