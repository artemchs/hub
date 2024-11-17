import {
  readManyIds,
  readManyIdsInfinite,
} from "~/server/actions/ids/readManyIds";
import { protectedProcedure } from "~/server/api/trpc";
import {
  readManyIdsInfiniteSchema,
  readManyIdsSchema,
} from "~/utils/validation/ids/readManyIds";

export const readManyGoodsIdsHandler = protectedProcedure
  .input(readManyIdsSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readManyIds({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read goods ids");
    }
  });

export const readManyGoodsIdsInfiniteHandler = protectedProcedure
  .input(readManyIdsInfiniteSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readManyIdsInfinite({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read goods ids");
    }
  });
