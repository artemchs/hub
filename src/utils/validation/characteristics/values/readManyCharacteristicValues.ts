import { z } from "zod";
import { readManyInfiniteSchema } from "../../readMany";

export const readManyCharacteristicValuesInfiniteSchema = z.object({
  ...readManyInfiniteSchema.shape,
});

export type ReadManyCharacteristicValuesInfiniteInput = z.infer<
  typeof readManyCharacteristicValuesInfiniteSchema
>;
