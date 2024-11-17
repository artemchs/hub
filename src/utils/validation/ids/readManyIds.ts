import { z } from "zod";
import { readManyInfiniteSchema, readManySchema } from "../readMany";

// Final schema
export const readManyIdsSchema = z.object({
  ...readManySchema.shape,
});

export type ReadManyIdsInput = z.infer<typeof readManyIdsSchema>;

export const readManyIdsInfiniteSchema = z.object({
  ...readManyInfiniteSchema.shape,
});

export type ReadManyIdsInfiniteInput = z.infer<
  typeof readManyIdsInfiniteSchema
>;
