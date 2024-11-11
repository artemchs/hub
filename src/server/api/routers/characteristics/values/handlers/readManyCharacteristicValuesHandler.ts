import { readManyCharacteristicValuesInfinite } from "~/server/actions/characteristics/values/readManyCharacteristicValues";
import { protectedProcedure } from "~/server/api/trpc";
import { readManyCharacteristicValuesInfiniteSchema } from "~/utils/validation/characteristics/values/readManyCharacteristicValues";

export const readManyCharacteristicValuesInfiniteHandler = protectedProcedure
  .input(readManyCharacteristicValuesInfiniteSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readManyCharacteristicValuesInfinite({
        tx: ctx.db,
        payload: input,
      });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read characteristic values");
    }
  });
