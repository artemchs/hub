import {
  generateManyUploadUrls,
  generateManyUploadUrlsWithKeys,
} from "~/server/actions/media/generateManyUploadUrls";
import { protectedProcedure } from "~/server/api/trpc";
import {
  generateManyUploadUrlsSchema,
  generateManyUploadUrlsWithKeysSchema,
} from "~/utils/validation/media/generateManyUploadUrls";

export const generateManyUploadUrlsHandler = protectedProcedure
  .input(generateManyUploadUrlsSchema)
  .query(async ({ input, ctx }) => {
    try {
      return generateManyUploadUrls({ storage: ctx.storage, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to generate upload urls");
    }
  });

export const generateManyUploadUrlsWithKeysHandler = protectedProcedure
  .input(generateManyUploadUrlsWithKeysSchema)
  .query(async ({ input, ctx }) => {
    try {
      return generateManyUploadUrlsWithKeys({
        storage: ctx.storage,
        payload: input,
      });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to generate upload urls");
    }
  });
