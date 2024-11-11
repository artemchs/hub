import { z } from "zod";
import { readOneCharacteristicValueSchema } from "./readOneCharacteristicValue";

export const deleteOneCharacteristicValueSchema = z.object({
  ...readOneCharacteristicValueSchema.shape,
});

export type DeleteOneCharacteristicValueInput = z.infer<
  typeof deleteOneCharacteristicValueSchema
>;
