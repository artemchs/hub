import { z } from "zod";

export const readOneCategorySchema = z.object({
  id: z.string().min(1),
});

export type ReadOneCategoryInput = z.infer<typeof readOneCategorySchema>;
