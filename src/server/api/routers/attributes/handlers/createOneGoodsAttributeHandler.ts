import { createOneAttribute } from "~/server/actions/attributes/createOneAttribute";
import { protectedProcedure } from "~/server/api/trpc";
import { createOneAttributeSchema } from "~/utils/validation/attributes/createOneAttribute";

export const createOneGoodsAttributeHandler = protectedProcedure
  .input(createOneAttributeSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return createOneAttribute({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create goods attribute");
    }
  });
