import { updateOneCharacteristic } from "~/server/actions/characteristics/updateOneCharacteristic";
import { protectedProcedure } from "~/server/api/trpc";
import { updateOneCharacteristicSchema } from "~/utils/validation/characteristics/updateOneCharacteristic";

export const updateOneCharacteristicHandler = protectedProcedure
  .input(updateOneCharacteristicSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return updateOneCharacteristic({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update characteristic");
    }
  });
