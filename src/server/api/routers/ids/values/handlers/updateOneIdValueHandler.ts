import { updateOneIdValue } from "~/server/actions/ids/values/updateOneIdValue";
import { protectedProcedure } from "~/server/api/trpc";
import { updateOneIdValueSchema } from "~/utils/validation/ids/values/updateOneIdValue";

export const updateOneIdValueHandler = protectedProcedure
  .input(updateOneIdValueSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return updateOneIdValue({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update id value");
    }
  });
