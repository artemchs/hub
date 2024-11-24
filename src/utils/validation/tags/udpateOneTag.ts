import { z } from "zod";
import { readOneTagSchema } from "./readOneTag";
import { createOneTagSchema } from "./createOneTag";

export const updateOneTagSchema = z.object({
  ...readOneTagSchema.shape,
  ...createOneTagSchema.shape,
});

export type UpdateOneTagInput = z.infer<typeof updateOneTagSchema>;
