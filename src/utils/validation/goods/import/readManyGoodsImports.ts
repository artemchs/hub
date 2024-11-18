import { z } from "zod";
import { readManySchema } from "../../readMany";

export const readManyGoodsImportsSchema = z.object({
  ...readManySchema.shape,
});

export type ReadManyGoodsImportsInput = z.infer<
  typeof readManyGoodsImportsSchema
>;
