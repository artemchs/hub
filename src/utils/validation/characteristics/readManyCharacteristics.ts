import { z } from "zod";
import { readManyInfiniteSchema, readManySchema } from "../readMany";

export const readManyCharacteristicsSchema = z.object({
  ...readManySchema.shape,
});

export type ReadManyCharacteristicsInput = z.infer<
  typeof readManyCharacteristicsSchema
>;

export const readManyCharacteristicsInfiniteSchema = z.object({
  ...readManyInfiniteSchema.shape,
});

export type ReadManyCharacteristicsInfiniteInput = z.infer<
  typeof readManyCharacteristicsInfiniteSchema
>;
