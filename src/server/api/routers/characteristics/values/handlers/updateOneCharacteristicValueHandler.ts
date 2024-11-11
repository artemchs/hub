import { updateOneCharacteristicValue } from "~/server/actions/characteristics/values/updateOneCharacteristicValue";
import { protectedProcedure } from "~/server/api/trpc";
import { updateOneCharacteristicValueSchema } from "~/utils/validation/characteristics/values/updateOneCharacteristicValue";

export const updateOneCharacteristicValueHandler = protectedProcedure
  .input(updateOneCharacteristicValueSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return updateOneCharacteristicValue({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update characteristic value");
    }
  });
