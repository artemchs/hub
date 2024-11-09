import { z } from "zod";

export const createOneCharacteristicSchema = z.object({
  name: z.string().min(1),
});

export type CreateOneCharacteristicInput = z.infer<
  typeof createOneCharacteristicSchema
>;
