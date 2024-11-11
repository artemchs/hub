import { readManyIdValuesInfinite } from "~/server/actions/ids/values/readmanyIdValues";
import { protectedProcedure } from "~/server/api/trpc";
import { readManyIdValuesInfiniteSchema } from "~/utils/validation/ids/values/readManyIdValues";

export const readManyIdValuesInfiniteHandler = protectedProcedure
  .input(readManyIdValuesInfiniteSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readManyIdValuesInfinite({
        tx: ctx.db,
        payload: input,
      });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read id values");
    }
  });
