import { z } from "zod";

export const readOneMediaSchema = z.object({
  id: z.string().min(1),
});

export type ReadOneMediaInput = z.infer<typeof readOneMediaSchema>;
