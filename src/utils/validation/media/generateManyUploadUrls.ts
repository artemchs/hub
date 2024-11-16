import { z } from "zod";

export const generateManyUploadUrlsSchema = z.object({
  dir: z.enum(["Media"]),
  count: z.number(),
});

export type GenerateManyUploadUrlsInput = z.infer<
  typeof generateManyUploadUrlsSchema
>;
