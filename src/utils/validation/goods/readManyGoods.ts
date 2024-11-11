import { z } from "zod";
import { readManyInfiniteSchema, readManySchema } from "../readMany";

export const readManyGoodsSchema = z.object({
  ...readManySchema.shape,
});

export type ReadManyGoodsInput = z.infer<typeof readManyGoodsSchema>;

export const readManyGoodsInfiniteSchema = z.object({
  ...readManyInfiniteSchema.shape,
});

export type ReadManyGoodsInfiniteInput = z.infer<
  typeof readManyGoodsInfiniteSchema
>;
