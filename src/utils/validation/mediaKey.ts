import { z } from "zod";

export const mediaKey = z
  .string()
  .min(1)
  .startsWith("Media/")
  .refine((val) => !val.endsWith("/"), {
    message: "Key cannot end with a slash",
  })
  .refine((val) => !val.includes("//"), {
    message: "Key cannot contain consecutive slashes",
  });
