import { z } from "zod";

export const generateOneUploadUrlSchema = z.object({
  dir: z.enum(["Media"]),
});

export type GenerateOneUploadUrlInput = z.infer<
  typeof generateOneUploadUrlSchema
>;
