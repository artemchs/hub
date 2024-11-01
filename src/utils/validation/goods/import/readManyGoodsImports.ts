import { z } from "zod";

export const readManyGoodsImportsSchema = z.object({
  search: z.string().optional(),
  filters: z
    .object({
      schemaId: z.string().optional(),
      status: z
        .enum(["PENDING", "PROCESSING", "COMPLETED", "FAILED"])
        .optional(),
    })
    .optional(),
  cursor: z.string().optional(),
  limit: z.number().min(1).max(100).optional(),
  orderBy: z
    .object({
      field: z.string(),
      direction: z.enum(["asc", "desc"]),
    })
    .optional(),
});

export type ReadManyGoodsImportsInput = z.infer<
  typeof readManyGoodsImportsSchema
>;
