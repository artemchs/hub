import { updateOneGood } from "~/server/actions/goods/updateOneGood";
import { protectedProcedure } from "~/server/api/trpc";
import { updateOneGoodSchema } from "~/utils/validation/goods/updateOneGood";

export const updateOneGoodHandler = protectedProcedure
  .input(updateOneGoodSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return updateOneGood({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update good");
    }
  });
