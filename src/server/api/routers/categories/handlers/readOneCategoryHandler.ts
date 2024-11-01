import { readOneCategory } from "~/server/actions/categories/readOneCategory";
import { protectedProcedure } from "~/server/api/trpc";
import { readOneCategorySchema } from "~/utils/validation/categories/readOneCategory";

export const readOneCategoryHandler = protectedProcedure
  .input(readOneCategorySchema)
  .query(async ({ input, ctx }) => {
    try {
      return readOneCategory({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read one category");
    }
  });
