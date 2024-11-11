import { readOneIdValue } from "~/server/actions/ids/values/readOneIdValue";
import { protectedProcedure } from "~/server/api/trpc";
import { readOneIdValueSchema } from "~/utils/validation/ids/values/readOneIdValue";

export const readOneIdValueHandler = protectedProcedure
  .input(readOneIdValueSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readOneIdValue({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read id value");
    }
  });
