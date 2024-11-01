import { z } from "zod";
import { readOneGoodsImportSchemaSchema } from "./readOneGoodsImportSchema";

export const deleteOneGoodsImportSchemaSchema = z.object({
  ...readOneGoodsImportSchemaSchema.shape,
});

export type DeleteOneGoodsImportSchemaInput = z.infer<
  typeof deleteOneGoodsImportSchemaSchema
>;
