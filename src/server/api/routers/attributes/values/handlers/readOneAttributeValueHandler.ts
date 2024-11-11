import { readOneAttributeValue } from "~/server/actions/attributes/values/readOneAttributeValue";
import { protectedProcedure } from "~/server/api/trpc";
import { readOneAttributeValueSchema } from "~/utils/validation/attributes/values/readOneAttributeValue";

export const readOneAttributeValueHandler = protectedProcedure
  .input(readOneAttributeValueSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readOneAttributeValue({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read attribute value");
    }
  });
