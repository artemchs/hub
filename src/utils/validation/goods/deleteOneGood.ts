import { z } from "zod";
import { readOneGoodSchema } from "./readOneGood";

export const deleteOneGoodSchema = z.object({
  ...readOneGoodSchema.shape,
});

export type DeleteOneGoodInput = z.infer<typeof deleteOneGoodSchema>;
