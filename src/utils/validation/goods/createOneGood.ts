import { Decimal } from "decimal.js";
import { z } from "zod";

export const createOneGoodSchema = z.object({
  name: z.string().min(1),
  sku: z.string().min(1),
  description: z.string().optional(),
  fullPrice: z.instanceof(Decimal).optional(),
  price: z.instanceof(Decimal).optional(),
  quantity: z.number().optional(),
  categoryId: z.string().optional(),
  attributeValueIds: z.array(z.string()).optional(),
  idValueIds: z.array(z.string()).optional(),
  mediaKeys: z.array(z.string()).optional(),
});

export type CreateOneGoodInput = z.infer<typeof createOneGoodSchema>;
