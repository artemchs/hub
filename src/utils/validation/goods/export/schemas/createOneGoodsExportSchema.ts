import { z } from "zod";

export const createOneGoodsExportSchemaSchema = z.object({
  name: z.string(),
  identifierIds: z.array(z.string()),
  template: z.enum(["XML_ROZETKA"]),
});

export type CreateOneGoodsExportSchemaInput = z.infer<
  typeof createOneGoodsExportSchemaSchema
>;
