import { z } from "zod";

export const createOneIdSchema = z.object({
  name: z.string().min(1),
});

export type CreateOneIdInput = z.infer<typeof createOneIdSchema>;
