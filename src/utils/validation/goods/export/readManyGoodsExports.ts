import { z } from "zod";
import { readManySchema } from "../../readMany";

export const readManyGoodsExportsSchema = z.object({
  ...readManySchema.shape,
});

export type ReadManyGoodsExportsInput = z.infer<
  typeof readManyGoodsExportsSchema
>;
