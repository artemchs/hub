import { createOneCharacteristic } from "~/server/actions/characteristics/createOneCharacteristic";
import { protectedProcedure } from "~/server/api/trpc";
import { createOneCharacteristicSchema } from "~/utils/validation/characteristics/createOneCharacteristic";

export const createOneCharacteristicHandler = protectedProcedure
  .input(createOneCharacteristicSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return createOneCharacteristic({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create characteristic");
    }
  });
