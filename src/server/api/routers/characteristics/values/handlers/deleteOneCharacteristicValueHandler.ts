import { deleteOneCharacteristicValue } from "~/server/actions/characteristics/values/deleteOneCharacteristicValue";
import { protectedProcedure } from "~/server/api/trpc";
import { deleteOneCharacteristicValueSchema } from "~/utils/validation/characteristics/values/deleteOneCharacteristicValue";

export const deleteOneCharacteristicValueHandler = protectedProcedure
  .input(deleteOneCharacteristicValueSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return deleteOneCharacteristicValue({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete characteristic value");
    }
  });
