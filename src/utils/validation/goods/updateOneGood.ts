import { z } from "zod";
import { createOneGoodSchema } from "./createOneGood";
import { readOneGoodSchema } from "./readOneGood";

export const updateOneGoodSchema = z.object({
  ...readOneGoodSchema.shape,
  ...createOneGoodSchema.shape,
});

export type UpdateOneGoodInput = z.infer<typeof updateOneGoodSchema>;
