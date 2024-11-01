import { z } from "zod";

export const readOneGoodSchema = z.object({
  id: z.string().min(1),
});

export type ReadOneGoodInput = z.infer<typeof readOneGoodSchema>;
