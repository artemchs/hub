import { z } from "zod";

export const createOneGoodsExportSchema = z.object({
  schemaId: z.string().min(1),
});

export type CreateOneGoodsExportInput = z.infer<
  typeof createOneGoodsExportSchema
>;
