import {
  readManyMedia,
  readManyMediaInfinite,
} from "~/server/actions/media/readManyMedia";
import { protectedProcedure } from "~/server/api/trpc";
import {
  readManyMediaInfiniteSchema,
  readManyMediaSchema,
} from "~/utils/validation/media/readManyMedia";

export const readManyGoodsMediaHandler = protectedProcedure
  .input(readManyMediaSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readManyMedia({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read many Media");
    }
  });

export const readManyGoodsMediaInfiniteHandler = protectedProcedure
  .input(readManyMediaInfiniteSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readManyMediaInfinite({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read many Media");
    }
  });
