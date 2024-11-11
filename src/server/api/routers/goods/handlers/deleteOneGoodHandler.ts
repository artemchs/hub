import { deleteOneGood } from "~/server/actions/goods/deleteOneGood";
import { protectedProcedure } from "~/server/api/trpc";
import { deleteOneGoodSchema } from "~/utils/validation/goods/deleteOneGood";

export const deleteOneGoodHandler = protectedProcedure
  .input(deleteOneGoodSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return deleteOneGood({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete good");
    }
  });
