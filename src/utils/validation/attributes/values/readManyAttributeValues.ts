import { z } from "zod";
import { readManyInfiniteSchema } from "../../readMany";

export const readManyAttributeValuesInfiniteSchema = z.object({
  ...readManyInfiniteSchema.shape,
});

export type ReadManyAttributeValuesInfiniteInput = z.infer<
  typeof readManyAttributeValuesInfiniteSchema
>;
