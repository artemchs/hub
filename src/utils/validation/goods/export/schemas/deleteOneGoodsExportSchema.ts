import { z } from "zod";
import { readOneGoodsExportSchemaSchema } from "./readOneGoodsExportSchema";

export const deleteOneGoodsExportSchemaSchema = z.object({
  ...readOneGoodsExportSchemaSchema.shape,
});

export type DeleteOneGoodsExportSchemaInput = z.infer<
  typeof deleteOneGoodsExportSchemaSchema
>;
