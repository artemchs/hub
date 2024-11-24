import {
  readManyTags,
  readManyTagsInfinite,
} from "~/server/actions/tags/readManyTags";
import { protectedProcedure } from "~/server/api/trpc";
import {
  readManyTagsInfiniteSchema,
  readManyTagsSchema,
} from "~/utils/validation/tags/readManyTags";

export const readManyGoodsTagsHandler = protectedProcedure
  .input(readManyTagsSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readManyTags({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read goods tags");
    }
  });

export const readManyGoodsTagsInfiniteHandler = protectedProcedure
  .input(readManyTagsInfiniteSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readManyTagsInfinite({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read goods tags");
    }
  });
