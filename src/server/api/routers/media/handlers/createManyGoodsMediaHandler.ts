import { createManyMedia } from "~/server/actions/media/createManyMedia";
import { protectedProcedure } from "~/server/api/trpc";
import { createManyMediaSchema } from "~/utils/validation/media/createManyMedia";

export const createManyGoodsMediaHandler = protectedProcedure
  .input(createManyMediaSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return createManyMedia({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create many goods media");
    }
  });
