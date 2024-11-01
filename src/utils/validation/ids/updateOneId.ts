import { z } from "zod";
import { createOneIdSchema } from "./createOneId";
import { readOneIdSchema } from "./readOneId";

export const updateOneIdSchema = z.object({
  ...readOneIdSchema.shape,
  ...createOneIdSchema.shape,
});

export type UpdateOneIdInput = z.infer<typeof updateOneIdSchema>;
