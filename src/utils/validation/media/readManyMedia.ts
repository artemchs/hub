import { z } from "zod";

export const readManyMediaSchema = z.object({
  search: z.string().optional(),
  filters: z.object({}).optional(),
  cursor: z.string().optional(),
  limit: z.number().min(1).max(100).optional(),
  orderBy: z
    .object({
      field: z.string(),
      direction: z.enum(["asc", "desc"]),
    })
    .optional(),
});

export type ReadManyMediaInput = z.infer<typeof readManyMediaSchema>;
