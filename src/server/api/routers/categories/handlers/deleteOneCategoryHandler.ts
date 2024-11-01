import { deleteOneCategory } from "~/server/actions/categories/deleteOneCategory";
import { protectedProcedure } from "~/server/api/trpc";
import { deleteOneCategorySchema } from "~/utils/validation/categories/deleteOneCategory";

export const deleteOneCategoryHandler = protectedProcedure
  .input(deleteOneCategorySchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return deleteOneCategory({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete category");
    }
  });
