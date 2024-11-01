import { updateOneCategory } from "~/server/actions/categories/updateOneCategory";
import { protectedProcedure } from "~/server/api/trpc";
import { updateOneCategorySchema } from "~/utils/validation/categories/updateOneCategory";

export const updateOneCategoryHandler = protectedProcedure
  .input(updateOneCategorySchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return updateOneCategory({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update category");
    }
  });
