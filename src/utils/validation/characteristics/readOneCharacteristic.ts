import { z } from "zod";

export const readOneCharacteristicSchema = z.object({
  id: z.string().min(1),
});

export type ReadOneCharacteristicInput = z.infer<
  typeof readOneCharacteristicSchema
>;
