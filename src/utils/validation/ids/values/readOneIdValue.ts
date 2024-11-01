import { z } from "zod";

export const readOneIdValueSchema = z.object({
  id: z.string().min(1),
});

export type ReadOneIdValueInput = z.infer<typeof readOneIdValueSchema>;
