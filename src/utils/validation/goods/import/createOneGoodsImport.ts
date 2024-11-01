import { z } from "zod";

export const createOneGoodsImportSchema = z.object({
  fileKey: z.string().min(1),
  schemaId: z.string().min(1),
});

export type CreateOneGoodsImportInput = z.infer<
  typeof createOneGoodsImportSchema
>;
