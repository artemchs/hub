import { z } from "zod";

export const readOneInternalFieldValueSchema = z.object({
  id: z.string().min(1),
});

export type ReadOneInternalFieldValueInput = z.infer<
  typeof readOneInternalFieldValueSchema
>;
