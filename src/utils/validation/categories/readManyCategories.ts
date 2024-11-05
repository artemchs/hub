import { z } from "zod";

export const readManyCategoriesSchema = z.object({
  search: z.string().optional(),
  filters: z
    .object({
      parentId: z.string().optional(),
    })
    .optional(),
  page: z.number().min(1),
  limit: z.number().min(1).max(1000),
  orderBy: z
    .object({
      field: z.string(),
      direction: z.enum(["asc", "desc"]),
    })
    .optional(),
});

export type ReadManyCategoriesInput = z.infer<typeof readManyCategoriesSchema>;
