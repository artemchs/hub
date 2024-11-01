import { updateOneId } from "~/server/actions/ids/updateOneId";
import { protectedProcedure } from "~/server/api/trpc";
import { updateOneIdSchema } from "~/utils/validation/ids/updateOneId";

export const updateOneGoodsIdHandler = protectedProcedure
  .input(updateOneIdSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return updateOneId({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update goods id");
    }
  });
