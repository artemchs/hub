import { z } from "zod";

export const createOneAttributeSchema = z.object({
  name: z.string().min(1),
});

export type CreateOneAttributeInput = z.infer<typeof createOneAttributeSchema>;
