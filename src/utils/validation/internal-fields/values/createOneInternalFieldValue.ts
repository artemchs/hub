import { z } from "zod";

export const createOneInternalFieldValueSchema = z.object({
  value: z.string().min(1),
  parentId: z.string().min(1),
});

export type CreateOneInternalFieldValueInput = z.infer<
  typeof createOneInternalFieldValueSchema
>;
