import { createOneCategory } from "~/server/actions/categories/createOneCategory";
import { protectedProcedure } from "~/server/api/trpc";
import { createOneCategorySchema } from "~/utils/validation/categories/createOneCategory";

export const createOneCategoryHandler = protectedProcedure
  .input(createOneCategorySchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return createOneCategory({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create category");
    }
  });
