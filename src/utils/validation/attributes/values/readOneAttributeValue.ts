import { z } from "zod";

export const readOneAttributeValueSchema = z.object({
  id: z.string().min(1),
});

export type ReadOneAttributeValueInput = z.infer<
  typeof readOneAttributeValueSchema
>;
