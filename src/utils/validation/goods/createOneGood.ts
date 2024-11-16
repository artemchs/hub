import { z } from "zod";

export const createOneGoodSchema = z.object({
  name: z.string().min(1),
  sku: z.string().min(1),
  description: z.string().optional(),
  fullPrice: z.number().optional(),
  price: z.number().optional(),
  quantity: z.number().optional(),
  categoryId: z.string().optional(),
  attributes: z
    .array(z.object({ id: z.string(), valueId: z.string() }))
    .optional(),
  characteristics: z
    .array(z.object({ id: z.string(), valueIds: z.array(z.string()) }))
    .optional(),
  idValueIds: z.array(z.string()).optional(),
  mediaKeys: z.array(z.string()).optional(),
});

export type CreateOneGoodInput = z.infer<typeof createOneGoodSchema>;
