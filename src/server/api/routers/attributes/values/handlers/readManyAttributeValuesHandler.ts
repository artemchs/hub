import { readManyAttributeValuesInfinite } from "~/server/actions/attributes/values/readManyAttributeValues";
import { protectedProcedure } from "~/server/api/trpc";
import { readManyAttributeValuesInfiniteSchema } from "~/utils/validation/attributes/values/readManyAttributeValues";

export const readManyAttributeValuesInfiniteHandler = protectedProcedure
  .input(readManyAttributeValuesInfiniteSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readManyAttributeValuesInfinite({
        tx: ctx.db,
        payload: input,
      });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read attribute values");
    }
  });
