import { z } from "zod";

export const readOneCharacteristicValueSchema = z.object({
  id: z.string().min(1),
});

export type ReadOneCharacteristicValueInput = z.infer<
  typeof readOneCharacteristicValueSchema
>;
