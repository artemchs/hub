import { readOneGood } from "~/server/actions/goods/readOneGood";
import { protectedProcedure } from "~/server/api/trpc";
import { readOneGoodSchema } from "~/utils/validation/goods/readOneGood";

export const readOneGoodHandler = protectedProcedure
  .input(readOneGoodSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readOneGood({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read good");
    }
  });
