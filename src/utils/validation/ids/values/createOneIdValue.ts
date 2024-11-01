import { z } from "zod";

export const createOneIdValueSchema = z.object({
  value: z.string().min(1),
  parentId: z.string().min(1),
});

export type CreateOneIdValueInput = z.infer<typeof createOneIdValueSchema>;
