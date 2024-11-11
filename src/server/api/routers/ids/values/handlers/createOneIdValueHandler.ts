import { createOneIdValue } from "~/server/actions/ids/values/createOneIdValue";
import { protectedProcedure } from "~/server/api/trpc";
import { createOneIdValueSchema } from "~/utils/validation/ids/values/createOneIdValue";

export const createOneIdValueHandler = protectedProcedure
  .input(createOneIdValueSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return createOneIdValue({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create id value");
    }
  });
