import { updateOneAttribute } from "~/server/actions/attributes/updateOneAttribute";
import { protectedProcedure } from "~/server/api/trpc";
import { updateOneAttributeSchema } from "~/utils/validation/attributes/updateOneAttribute";

export const updateOneGoodsAttributeHandler = protectedProcedure
  .input(updateOneAttributeSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return updateOneAttribute({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update goods attribute");
    }
  });
