import { z } from "zod";
import {
  readManyInfiniteSchema,
  readManySchema,
} from "~/utils/validation/readMany";

export const readManyGoodsExportSchemasSchema = z.object({
  ...readManySchema.shape,
});

export type ReadManyGoodsExportSchemasInput = z.infer<
  typeof readManyGoodsExportSchemasSchema
>;

export const readManyGoodsExportSchemasInfiniteSchema = z.object({
  ...readManyInfiniteSchema.shape,
});

export type ReadManyGoodsExportSchemasInfiniteInput = z.infer<
  typeof readManyGoodsExportSchemasInfiniteSchema
>;
