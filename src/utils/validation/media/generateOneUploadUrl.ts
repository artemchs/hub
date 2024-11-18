import { z } from "zod";

export const generateOneUploadUrlSchema = z.object({
  dir: z.enum(["Media", "Import"]),
});

export type GenerateOneUploadUrlInput = z.infer<
  typeof generateOneUploadUrlSchema
>;
