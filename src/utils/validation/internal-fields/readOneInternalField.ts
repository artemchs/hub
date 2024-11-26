import { z } from "zod";

export const readOneInternalFieldSchema = z.object({
  id: z.string().min(1),
});

export type ReadOneInternalFieldInput = z.infer<
  typeof readOneInternalFieldSchema
>;
