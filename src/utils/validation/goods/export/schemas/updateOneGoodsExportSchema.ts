import { z } from "zod";
import { readOneGoodsExportSchemaSchema } from "./readOneGoodsExportSchema";
import { createOneGoodsExportSchemaSchema } from "./createOneGoodsExportSchema";

export const updateOneGoodsExportSchemaSchema = z.object({
  ...readOneGoodsExportSchemaSchema.shape,
  ...createOneGoodsExportSchemaSchema.shape,
});

export type UpdateOneGoodsExportSchemaInput = z.infer<
  typeof updateOneGoodsExportSchemaSchema
>;
