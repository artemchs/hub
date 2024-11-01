import { z } from "zod";

export const createOneMediaSchema = z.object({
  key: z.string().min(1),
});

export type CreateOneMediaInput = z.infer<typeof createOneMediaSchema>;
