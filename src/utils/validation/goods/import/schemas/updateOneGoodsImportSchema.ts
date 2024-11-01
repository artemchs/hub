import { z } from "zod";
import { createOneGoodsImportSchemaSchema } from "./createOneGoodsImportSchema";
import { readOneGoodsImportSchemaSchema } from "./readOneGoodsImportSchema";

export const updateOneGoodsImportSchemaSchema = z.object({
  ...readOneGoodsImportSchemaSchema.shape,
  ...createOneGoodsImportSchemaSchema.shape,
});

export type UpdateOneGoodsImportSchemaInput = z.infer<
  typeof updateOneGoodsImportSchemaSchema
>;
