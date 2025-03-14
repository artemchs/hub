import {
  readManyCategories,
  readManyCategoriesInfinite,
} from "~/server/actions/categories/readManyCategories";
import { protectedProcedure } from "~/server/api/trpc";
import {
  readManyCategoriesInfiniteSchema,
  readManyCategoriesSchema,
} from "~/utils/validation/categories/readManyCategories";

export const readManyCategoriesHandler = protectedProcedure
  .input(readManyCategoriesSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readManyCategories({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read many categories");
    }
  });

export const readManyCategoriesInfiniteHandler = protectedProcedure
  .input(readManyCategoriesInfiniteSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readManyCategoriesInfinite({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read many categories");
    }
  });
