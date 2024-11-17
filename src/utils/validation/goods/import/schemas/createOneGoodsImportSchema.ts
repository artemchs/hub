import { z } from "zod";

export const createOneGoodsImportSchemaSchema = z.object({
  name: z.string().min(1),
  schema: z.object({
    name: z.string().optional(),
    sku: z.string().optional(),
    description: z.string().optional(),
    fullPrice: z.string().optional(),
    price: z.string().optional(),
    fixedDiscount: z.string().optional(),
    percentageDiscount: z.string().optional(),
    quantity: z.string().optional(),
    mediaKeys: z.string().optional(),
    attributes: z
      .array(
        z.object({
          id: z.string().min(1),
          field: z.string().min(1),
        })
      )
      .optional(),
    characteristics: z
      .array(
        z.object({
          id: z.string().min(1),
          field: z.string().min(1),
        })
      )
      .optional(),
    ids: z
      .array(
        z.object({
          id: z.string().min(1),
          field: z.string().min(1),
        })
      )
      .optional(),
  }),
});

export type CreateOneGoodsImportSchemaInput = z.infer<
  typeof createOneGoodsImportSchemaSchema
>;
