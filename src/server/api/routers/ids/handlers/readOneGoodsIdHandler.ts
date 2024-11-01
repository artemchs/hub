import { readOneId } from "~/server/actions/ids/readOneId";
import { protectedProcedure } from "~/server/api/trpc";
import { readOneIdSchema } from "~/utils/validation/ids/readOneId";

export const readOneGoodsIdHandler = protectedProcedure
  .input(readOneIdSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readOneId({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create goods id");
    }
  });
