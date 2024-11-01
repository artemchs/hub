import { z } from "zod";

export const readManyGoodsImportSchemasSchema = z.object({
  search: z.string().optional(),
  filters: z.object({}).optional(),
  cursor: z.string().optional(),
  limit: z.number().min(1).max(100).optional(),
  orderBy: z
    .object({
      field: z.string(),
      direction: z.enum(["asc", "desc"]),
    })
    .optional(),
});

export type ReadManyGoodsImportSchemasInput = z.infer<
  typeof readManyGoodsImportSchemasSchema
>;
