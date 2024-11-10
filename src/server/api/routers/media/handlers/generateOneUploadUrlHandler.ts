import { generateOneUploadUrl } from "~/server/actions/media/generateOneUploadUrl";
import { protectedProcedure } from "~/server/api/trpc";
import { generateOneUploadUrlSchema } from "~/utils/validation/media/generateOneUploadUrl";

export const generateOneUploadUrlHandler = protectedProcedure
  .input(generateOneUploadUrlSchema)
  .query(async ({ input, ctx }) => {
    try {
      return generateOneUploadUrl({ storage: ctx.storage, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to generate upload url");
    }
  });
