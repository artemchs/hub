import { createOneGood } from "~/server/actions/goods/createOneGood";
import { protectedProcedure } from "~/server/api/trpc";
import { createOneGoodSchema } from "~/utils/validation/goods/createOneGood";

export const createOneGoodHandler = protectedProcedure
  .input(createOneGoodSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return createOneGood({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create good");
    }
  });
