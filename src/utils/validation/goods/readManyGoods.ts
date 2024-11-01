import { z } from "zod";

export const readManyGoodsSchema = z.object({
  search: z.string().optional(),
  filters: z
    .object({
      categoryIds: z.array(z.string()).optional(),
      attributeValueIds: z.array(z.string()).optional(),
      idValueIds: z.array(z.string()).optional(),
      mediaIds: z.array(z.string()).optional(),
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

export type ReadManyGoodsInput = z.infer<typeof readManyGoodsSchema>;
