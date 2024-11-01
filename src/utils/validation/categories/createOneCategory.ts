import { z } from "zod";

export const createOneCategorySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  parentId: z.string().optional(),
});

export type CreateOneCategoryInput = z.infer<typeof createOneCategorySchema>;
