import { readOneMedia } from "~/server/actions/media/readOneMedia";
import { protectedProcedure } from "~/server/api/trpc";
import { readOneMediaSchema } from "~/utils/validation/media/readOneMedia";

export const readOneGoodsMediaHandler = protectedProcedure
  .input(readOneMediaSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readOneMedia({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read goods media");
    }
  });
