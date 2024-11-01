import { z } from "zod";

export const readOneIdSchema = z.object({
  id: z.string().min(1),
});

export type ReadOneIdInput = z.infer<typeof readOneIdSchema>;
