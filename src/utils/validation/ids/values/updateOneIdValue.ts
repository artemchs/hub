import { z } from "zod";
import { createOneIdValueSchema } from "./createOneIdValue";
import { readOneIdValueSchema } from "./readOneIdValue";

export const updateOneIdValueSchema = z.object({
  ...readOneIdValueSchema.shape,
  ...createOneIdValueSchema.shape,
});

export type UpdateOneIdValueInput = z.infer<typeof updateOneIdValueSchema>;
