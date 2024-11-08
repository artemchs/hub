import { z } from "zod";
import { readManySchema } from "../readMany";

// Final schema
export const readManyIdsSchema = z.object({
  ...readManySchema.shape,
});

export type ReadManyIdsInput = z.infer<typeof readManyIdsSchema>;
