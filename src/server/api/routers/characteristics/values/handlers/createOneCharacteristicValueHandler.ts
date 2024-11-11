import { createOneCharacteristicValue } from "~/server/actions/characteristics/values/createOneCharacteristicValue";
import { protectedProcedure } from "~/server/api/trpc";
import { createOneCharacteristicValueSchema } from "~/utils/validation/characteristics/values/createOneCharacteristicValue";

export const createOneCharacteristicValueHandler = protectedProcedure
  .input(createOneCharacteristicValueSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return createOneCharacteristicValue({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create characteristic value");
    }
  });
