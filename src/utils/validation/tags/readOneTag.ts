import { z } from "zod";

export const readOneTagSchema = z.object({
  id: z.string().min(1),
});

export type ReadOneTagInput = z.infer<typeof readOneTagSchema>;
