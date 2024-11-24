import { z } from "zod";

export const createOneTagSchema = z.object({
  name: z.string().min(1),
});

export type CreateOneTagInput = z.infer<typeof createOneTagSchema>;
