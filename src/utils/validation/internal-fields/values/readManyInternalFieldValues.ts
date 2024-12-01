import { z } from "zod";
import { readManyInfiniteSchema } from "../../readMany";

export const readManyInternalFieldValuesInfiniteSchema = z.object({
  ...readManyInfiniteSchema.shape,
  parentId: z.string().optional(),
});

export type ReadManyInternalFieldValuesInfiniteInput = z.infer<
  typeof readManyInternalFieldValuesInfiniteSchema
>;
