import { readManyAttributes } from "~/server/actions/attributes/readManyAttributes";
import { protectedProcedure } from "~/server/api/trpc";
import { readManyAttributesSchema } from "~/utils/validation/attributes/readManyAttributes";

export const readManyGoodsAttributesHandler = protectedProcedure
  .input(readManyAttributesSchema)
  .query(async ({ ctx, input }) => {
    try {
      return readManyAttributes({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read goods attributes");
    }
  });
