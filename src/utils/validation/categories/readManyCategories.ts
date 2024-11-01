import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "~/utils/constants";
import { z } from "zod";

export const readManyCategoriesSchema = z.object({
  search: z.string().optional(),
  filters: z
    .object({
      parentId: z.string().optional(),
    })
    .optional(),
  page: z.number().min(1).default(DEFAULT_PAGE),
  limit: z.number().min(1).max(1000).default(DEFAULT_PAGE_SIZE),
  orderBy: z
    .object({
      field: z.string(),
      direction: z.enum(["asc", "desc"]),
    })
    .optional(),
});

export type ReadManyCategoriesInput = z.infer<typeof readManyCategoriesSchema>;
