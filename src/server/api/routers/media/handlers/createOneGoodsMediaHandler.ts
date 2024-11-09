import { createOneMedia } from "~/server/actions/media/createOneMedia";
import { protectedProcedure } from "~/server/api/trpc";
import { createOneMediaSchema } from "~/utils/validation/media/createOneMedia";

export const createOneGoodsMediaHandler = protectedProcedure
  .input(createOneMediaSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return createOneMedia({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create goods media");
    }
  });
