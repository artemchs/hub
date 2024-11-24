import { z } from "zod";

export const readOneGoodsExportSchemaSchema = z.object({
  id: z.string().min(1),
});

export type ReadOneGoodsExportSchemaInput = z.infer<
  typeof readOneGoodsExportSchemaSchema
>;
