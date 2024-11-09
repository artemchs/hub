import { z } from "zod";
import { readManyInfiniteSchema, readManySchema } from "../readMany";

export const readManyCategoriesSchema = z.object({
  ...readManySchema.shape,
});

export type ReadManyCategoriesInput = z.infer<typeof readManyCategoriesSchema>;

export const readManyCategoriesInfiniteSchema = z.object({
  ...readManyInfiniteSchema.shape,
});

export type ReadManyCategoriesInfiniteInput = z.infer<
  typeof readManyCategoriesInfiniteSchema
>;
