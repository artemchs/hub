import { z } from "zod";
import { readManyInfiniteSchema, readManySchema } from "../readMany";

export const readManyInternalFieldsSchema = z.object({
  ...readManySchema.shape,
});

export type ReadManyInternalFieldsInput = z.infer<
  typeof readManyInternalFieldsSchema
>;

export const readManyInternalFieldsInfiniteSchema = z.object({
  ...readManyInfiniteSchema.shape,
});

export type ReadManyInternalFieldsInfiniteInput = z.infer<
  typeof readManyInternalFieldsInfiniteSchema
>;
