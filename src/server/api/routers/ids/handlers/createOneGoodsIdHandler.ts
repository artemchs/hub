import { createOneId } from "~/server/actions/ids/createOneId";
import { protectedProcedure } from "~/server/api/trpc";
import { createOneIdSchema } from "~/utils/validation/ids/createOneId";

export const createOneGoodsIdHandler = protectedProcedure
  .input(createOneIdSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return createOneId({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create goods id");
    }
  });
