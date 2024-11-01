import { z } from "zod";
import { readOneAttributeSchema } from "./readOneAttribute";

export const deleteOneAttributeSchema = z.object({
  ...readOneAttributeSchema.shape,
});

export type DeleteOneAttributeInput = z.infer<typeof deleteOneAttributeSchema>;
