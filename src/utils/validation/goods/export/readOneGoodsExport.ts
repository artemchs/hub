import { z } from "zod";

export const readOneGoodsExportSchema = z.object({
  id: z.string().min(1),
});

export type ReadOneGoodsExportInput = z.infer<typeof readOneGoodsExportSchema>;
