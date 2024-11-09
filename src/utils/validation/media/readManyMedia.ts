import { z } from "zod";
import { readManyInfiniteSchema, readManySchema } from "../readMany";

export const readManyMediaSchema = z.object({
  ...readManySchema.shape,
});

export type ReadManyMediaInput = z.infer<typeof readManyMediaSchema>;

export const readManyMediaInfiniteSchema = z.object({
  ...readManyInfiniteSchema.shape,
});

export type ReadManyMediaInfiniteInput = z.infer<
  typeof readManyMediaInfiniteSchema
>;
