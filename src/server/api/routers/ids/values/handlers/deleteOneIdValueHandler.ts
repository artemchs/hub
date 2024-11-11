import { deleteOneIdValue } from "~/server/actions/ids/values/deleteOneIdValue";
import { protectedProcedure } from "~/server/api/trpc";
import { deleteOneIdValueSchema } from "~/utils/validation/ids/values/deleteOneIdValue";

export const deleteOneIdValueHandler = protectedProcedure
  .input(deleteOneIdValueSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return deleteOneIdValue({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete id value");
    }
  });
