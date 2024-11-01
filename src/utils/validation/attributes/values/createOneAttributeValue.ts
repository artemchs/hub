import { z } from "zod";

export const createOneAttributeValueSchema = z.object({
  value: z.string().min(1),
  parentId: z.string().min(1),
});

export type CreateOneAttributeValueInput = z.infer<
  typeof createOneAttributeValueSchema
>;
