import { updateOneMedia } from "~/server/actions/media/updateOneMedia";
import { protectedProcedure } from "~/server/api/trpc";
import { updateOneMediaSchema } from "~/utils/validation/media/updateOneMedia";

export const updateOneGoodsMediaHandler = protectedProcedure
  .input(updateOneMediaSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return updateOneMedia({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update goods media");
    }
  });
