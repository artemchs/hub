import { deleteOneId } from "~/server/actions/ids/deleteOneId";
import { protectedProcedure } from "~/server/api/trpc";
import { deleteOneIdSchema } from "~/utils/validation/ids/deleteOneId";

export const deleteOneGoodsIdHandler = protectedProcedure
  .input(deleteOneIdSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return deleteOneId({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete goods id");
    }
  });
