import { readOneCharacteristicValue } from "~/server/actions/characteristics/values/readOneCharacteristicValue";
import { protectedProcedure } from "~/server/api/trpc";
import { readOneCharacteristicValueSchema } from "~/utils/validation/characteristics/values/readOneCharacteristicValue";

export const readOneCharacteristicValueHandler = protectedProcedure
  .input(readOneCharacteristicValueSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readOneCharacteristicValue({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read characteristic value");
    }
  });
