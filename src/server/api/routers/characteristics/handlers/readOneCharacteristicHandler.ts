import { readOneCharacteristic } from "~/server/actions/characteristics/readOneCharacteristic";
import { protectedProcedure } from "~/server/api/trpc";
import { readOneCharacteristicSchema } from "~/utils/validation/characteristics/readOneCharacteristic";

export const readOneCharacteristicHandler = protectedProcedure
  .input(readOneCharacteristicSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readOneCharacteristic({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read one characteristic");
    }
  });
