import { z } from "zod";
import { readManyInfiniteSchema } from "../../readMany";

export const readManyAttributeValuesInfiniteSchema = z.object({
  ...readManyInfiniteSchema.shape,
  parentId: z.string().optional(),
});

export type ReadManyAttributeValuesInfiniteInput = z.infer<
  typeof readManyAttributeValuesInfiniteSchema
>;
