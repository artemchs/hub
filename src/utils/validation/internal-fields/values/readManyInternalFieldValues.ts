import { z } from "zod";
import { readManyInfiniteSchema } from "../../readMany";

export const readManyInternalFieldValuesInfiniteSchema = z.object({
  ...readManyInfiniteSchema.shape,
});

export type ReadManyInternalFieldValuesInfiniteInput = z.infer<
  typeof readManyInternalFieldValuesInfiniteSchema
>;
