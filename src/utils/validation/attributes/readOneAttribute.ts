import { z } from "zod";

export const readOneAttributeSchema = z.object({
  id: z.string().min(1),
});

export type ReadOneAttributeInput = z.infer<typeof readOneAttributeSchema>;
