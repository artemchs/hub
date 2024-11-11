import { z } from "zod";

export const createOneCharacteristicValueSchema = z.object({
  value: z.string().min(1),
  parentId: z.string().min(1),
});

export type CreateOneCharacteristicValueInput = z.infer<
  typeof createOneCharacteristicValueSchema
>;
