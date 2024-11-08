import { z } from "zod";
import { readManySchema } from "../readMany";

export const readManyCategoriesSchema = z.object({
  ...readManySchema.shape,
});

export type ReadManyCategoriesInput = z.infer<typeof readManyCategoriesSchema>;
