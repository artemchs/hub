import { z } from "zod";
import { mediaKey } from "../mediaKey";

export const createManyMediaSchema = z.object({
  files: z.array(
    z.object({
      key: mediaKey,
      name: z.string(),
    })
  ),
});

export type CreateManyMediaInput = z.infer<typeof createManyMediaSchema>;
