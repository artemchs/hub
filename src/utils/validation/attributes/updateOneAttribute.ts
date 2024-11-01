import { z } from "zod";
import { createOneAttributeSchema } from "./createOneAttribute";
import { readOneAttributeSchema } from "./readOneAttribute";

export const updateOneAttributeSchema = z.object({
  ...readOneAttributeSchema.shape,
  ...createOneAttributeSchema.shape,
});

export type UpdateOneAttributeInput = z.infer<typeof updateOneAttributeSchema>;
