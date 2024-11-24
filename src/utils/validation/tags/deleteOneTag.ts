import { z } from "zod";
import { readOneTagSchema } from "./readOneTag";

export const deleteOneTagSchema = z.object({
  ...readOneTagSchema.shape,
});

export type DeleteOneTagInput = z.infer<typeof deleteOneTagSchema>;
