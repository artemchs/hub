import { readOneAttribute } from "~/server/actions/attributes/readOneAttribute";
import { protectedProcedure } from "~/server/api/trpc";
import { readOneAttributeSchema } from "~/utils/validation/attributes/readOneAttribute";

export const readOneGoodsAttributeHandler = protectedProcedure
  .input(readOneAttributeSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readOneAttribute({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read goods attribute");
    }
  });
