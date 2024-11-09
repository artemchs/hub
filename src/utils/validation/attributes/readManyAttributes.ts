import { z } from "zod";
import { readManyInfiniteSchema, readManySchema } from "../readMany";

export const readManyAttributesSchema = z.object({
  ...readManySchema.shape,
});

export type ReadManyAttributesInput = z.infer<
  typeof readManyAttributesSchema
>;

export const readManyAttributesInfiniteSchema = z.object({
  ...readManyInfiniteSchema.shape,
});

export type ReadManyAttributesInfiniteInput = z.infer<
  typeof readManyAttributesInfiniteSchema
>;
