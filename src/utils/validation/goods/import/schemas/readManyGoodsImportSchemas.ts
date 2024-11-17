import { z } from "zod";
import {
  readManyInfiniteSchema,
  readManySchema,
} from "~/utils/validation/readMany";

export const readManyGoodsImportSchemasSchema = z.object({
  ...readManySchema.shape,
});

export type ReadManyGoodsImportSchemasInput = z.infer<
  typeof readManyGoodsImportSchemasSchema
>;

export const readManyGoodsImportSchemasInfiniteSchema = z.object({
  ...readManyInfiniteSchema.shape,
});

export type ReadManyGoodsImportSchemasInfiniteInput = z.infer<
  typeof readManyGoodsImportSchemasInfiniteSchema
>;
