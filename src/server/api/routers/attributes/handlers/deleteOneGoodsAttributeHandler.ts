import { deleteOneAttribute } from "~/server/actions/attributes/deleteOneAttribute";
import { protectedProcedure } from "~/server/api/trpc";
import { deleteOneAttributeSchema } from "~/utils/validation/attributes/deleteOneAttribute";

export const deleteOneGoodsAttributeHandler = protectedProcedure
  .input(deleteOneAttributeSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      return deleteOneAttribute({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete goods attribute");
    }
  });
