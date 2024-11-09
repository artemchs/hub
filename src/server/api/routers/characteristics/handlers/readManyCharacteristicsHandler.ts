import {
  readManyCharacteristics,
  readManyCharacteristicsInfinite,
} from "~/server/actions/characteristics/readManyCharacteristics";
import { protectedProcedure } from "~/server/api/trpc";
import {
  readManyCharacteristicsInfiniteSchema,
  readManyCharacteristicsSchema,
} from "~/utils/validation/characteristics/readManyCharacteristics";

export const readManyCharacteristicsHandler = protectedProcedure
  .input(readManyCharacteristicsSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readManyCharacteristics({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read many Characteristics");
    }
  });

export const readManyCharacteristicsInfiniteHandler = protectedProcedure
  .input(readManyCharacteristicsInfiniteSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readManyCharacteristicsInfinite({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read many Characteristics");
    }
  });
