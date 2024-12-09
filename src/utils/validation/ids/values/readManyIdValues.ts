import { z } from "zod";
import { readManyInfiniteSchema } from "../../readMany";

export const readManyIdValuesInfiniteSchema = z.object({
  ...readManyInfiniteSchema.shape,
  parentId: z.string().optional(),
});

export type ReadManyIdValuesInfiniteInput = z.infer<
  typeof readManyIdValuesInfiniteSchema
>;
