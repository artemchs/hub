import type { z } from "zod";
import { createOneInternalFieldSchema } from "./createOneInternalField";
import { readOneInternalFieldSchema } from "./readOneInternalField";

export const updateOneInternalFieldSchema = createOneInternalFieldSchema.extend(
  {
    ...readOneInternalFieldSchema.shape,
  }
);

export type UpdateOneInternalFieldInput = z.infer<
  typeof updateOneInternalFieldSchema
>;
