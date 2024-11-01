import { z } from "zod";
import { readOneIdValueSchema } from "./readOneIdValue";

export const deleteOneIdValueSchema = z.object({
  ...readOneIdValueSchema.shape,
});

export type DeleteOneIdValueInput = z.infer<typeof deleteOneIdValueSchema>;
