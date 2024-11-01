import { z } from "zod";
import { readOneAttributeValueSchema } from "./readOneAttributeValue";

export const deleteOneAttributeValueSchema = z.object({
  ...readOneAttributeValueSchema.shape,
});

export type DeleteOneAttributeValueInput = z.infer<
  typeof deleteOneAttributeValueSchema
>;
