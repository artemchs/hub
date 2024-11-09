import { deleteOneCharacteristic } from "~/server/actions/characteristics/deleteOneCharacteristic";
import { protectedProcedure } from "~/server/api/trpc";
import { deleteOneCharacteristicSchema } from "~/utils/validation/characteristics/deleteOneCharacteristic";

export const deleteOneCharacteristicHandler = protectedProcedure
  .input(deleteOneCharacteristicSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return deleteOneCharacteristic({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete characteristic");
    }
  });
