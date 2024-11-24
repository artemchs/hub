import { updateOneTag } from "~/server/actions/tags/updateOneTag";
import { protectedProcedure } from "~/server/api/trpc";
import { updateOneTagSchema } from "~/utils/validation/tags/udpateOneTag";

export const updateOneGoodsTagHandler = protectedProcedure
  .input(updateOneTagSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return updateOneTag({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update goods tag");
    }
  });
