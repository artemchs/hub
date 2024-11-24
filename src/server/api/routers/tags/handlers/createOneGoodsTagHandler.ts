import { createOneTag } from "~/server/actions/tags/createOneTag";
import { protectedProcedure } from "~/server/api/trpc";
import { createOneTagSchema } from "~/utils/validation/tags/createOneTag";

export const createOneGoodsTagHandler = protectedProcedure
  .input(createOneTagSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return createOneTag({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create goods tag");
    }
  });
