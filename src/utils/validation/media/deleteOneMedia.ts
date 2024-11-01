import { z } from "zod";
import { readOneMediaSchema } from "./readOneMedia";

export const deleteOneMediaSchema = z.object({
  ...readOneMediaSchema.shape,
});

export type DeleteOneMediaInput = z.infer<typeof deleteOneMediaSchema>;
