import { z } from "zod";

export const createOneGoodsExportSchemaSchema = z.object({
  name: z.string(),
  identifierIds: z.array(z.string()),
  template: z.enum(["XML_ROZETKA", "XLSX_ROZETKA"]),
  internalFields: z
    .array(
      z.object({
        id: z.string(),
        columnName: z.string(),
      })
    )
    .optional(),
});

export type CreateOneGoodsExportSchemaInput = z.infer<
  typeof createOneGoodsExportSchemaSchema
>;
