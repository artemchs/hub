import { z } from "zod";
import { readOneCharacteristicSchema } from "./readOneCharacteristic";
import { createOneCharacteristicSchema } from "./createOneCharacteristic";

export const updateOneCharacteristicSchema = z.object({
  ...readOneCharacteristicSchema.shape,
  ...createOneCharacteristicSchema.shape,
});

export type UpdateOneCharacteristicInput = z.infer<
  typeof updateOneCharacteristicSchema
>;
