import { z } from "zod";
import { createOneMediaSchema } from "./createOneMedia";
import { readOneMediaSchema } from "./readOneMedia";

export const updateOneMediaSchema = z.object({
  ...readOneMediaSchema.shape,
  ...createOneMediaSchema.shape,
});

export type UpdateOneMediaInput = z.infer<typeof updateOneMediaSchema>;
