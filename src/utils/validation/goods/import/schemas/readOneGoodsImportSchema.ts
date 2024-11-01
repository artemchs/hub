import { z } from "zod";

export const readOneGoodsImportSchemaSchema = z.object({
  id: z.string().min(1),
});

export type ReadOneGoodsImportSchemaInput = z.infer<
  typeof readOneGoodsImportSchemaSchema
>;
