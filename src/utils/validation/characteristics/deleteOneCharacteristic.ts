import { z } from "zod";
import { readOneCharacteristicSchema } from "./readOneCharacteristic";

export const deleteOneCharacteristicSchema = z.object({
  ...readOneCharacteristicSchema.shape,
});

export type DeleteOneCharacteristicInput = z.infer<
  typeof deleteOneCharacteristicSchema
>;
