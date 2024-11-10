import { z } from "zod";
import { mediaKey } from "../mediaKey";

export const createOneMediaSchema = z.object({
  key: mediaKey,
  name: z.string().min(1),
});

export type CreateOneMediaInput = z.infer<typeof createOneMediaSchema>;
