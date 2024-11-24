import { z } from "zod";
import { readManyInfiniteSchema, readManySchema } from "../readMany";

export const readManyTagsSchema = z.object({
  ...readManySchema.shape,
});

export type ReadManyTagsInput = z.infer<typeof readManyTagsSchema>;

export const readManyTagsInfiniteSchema = z.object({
  ...readManyInfiniteSchema.shape,
});

export type ReadManyTagsInfiniteInput = z.infer<
  typeof readManyTagsInfiniteSchema
>;
