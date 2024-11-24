import { deleteOneTag } from "~/server/actions/tags/deleteOneTag";
import { protectedProcedure } from "~/server/api/trpc";
import { deleteOneTagSchema } from "~/utils/validation/tags/deleteOneTag";

export const deleteOneGoodsTagHandler = protectedProcedure
  .input(deleteOneTagSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return deleteOneTag({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete goods tag");
    }
  });
