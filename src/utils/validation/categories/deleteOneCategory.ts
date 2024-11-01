import { z } from "zod";
import { readOneCategorySchema } from "./readOneCategory";

export const deleteOneCategorySchema = z.object({
  ...readOneCategorySchema.shape,
});

export type DeleteOneCategoryInput = z.infer<typeof deleteOneCategorySchema>;
