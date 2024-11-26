import { z } from "zod";

export const createOneInternalFieldSchema = z.object({
  name: z.string().min(1),
});

export type CreateOneInternalFieldInput = z.infer<
  typeof createOneInternalFieldSchema
>;
