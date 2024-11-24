import { readOneTag } from "~/server/actions/tags/readOneTag";
import { protectedProcedure } from "~/server/api/trpc";
import { readOneTagSchema } from "~/utils/validation/tags/readOneTag";

export const readOneGoodsTagHandler = protectedProcedure
  .input(readOneTagSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readOneTag({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create goods tag");
    }
  });
