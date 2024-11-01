import { z } from "zod";
import { readOneIdSchema } from "./readOneId";

export const deleteOneIdSchema = z.object({
  ...readOneIdSchema.shape,
});

export type DeleteOneIdInput = z.infer<typeof deleteOneIdSchema>;
