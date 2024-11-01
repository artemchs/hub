import { z } from "zod";
import { createOneAttributeValueSchema } from "./createOneAttributeValue";
import { readOneAttributeValueSchema } from "./readOneAttributeValue";

export const updateOneAttributeValueSchema = z.object({
  ...readOneAttributeValueSchema.shape,
  ...createOneAttributeValueSchema.shape,
});

export type UpdateOneAttributeValueInput = z.infer<
  typeof updateOneAttributeValueSchema
>;
