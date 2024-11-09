import { deleteOneMedia } from "~/server/actions/media/deleteOneMedia";
import { protectedProcedure } from "~/server/api/trpc";
import { deleteOneMediaSchema } from "~/utils/validation/media/deleteOneMedia";

export const deleteOneGoodsMediaHandler = protectedProcedure
  .input(deleteOneMediaSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      return deleteOneMedia({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete goods Media");
    }
  });
