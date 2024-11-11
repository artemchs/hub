import { z } from "zod";
import { readOneCharacteristicValueSchema } from "./readOneCharacteristicValue";
import { createOneCharacteristicValueSchema } from "./createOneCharacteristicValue";

export const updateOneCharacteristicValueSchema = z.object({
  ...readOneCharacteristicValueSchema.shape,
  ...createOneCharacteristicValueSchema.shape,
});

export type UpdateOneCharacteristicValueInput = z.infer<
  typeof updateOneCharacteristicValueSchema
>;
