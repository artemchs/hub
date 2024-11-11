import {
  readManyGoods,
  readManyGoodsInfinite,
} from "~/server/actions/goods/readManyGoods";
import { protectedProcedure } from "~/server/api/trpc";
import {
  readManyGoodsSchema,
  readManyGoodsInfiniteSchema,
} from "~/utils/validation/goods/readManyGoods";

export const readManyGoodsHandler = protectedProcedure
  .input(readManyGoodsSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readManyGoods({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read goods");
    }
  });

export const readManyGoodsInfiniteHandler = protectedProcedure
  .input(readManyGoodsInfiniteSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readManyGoodsInfinite({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read goods");
    }
  });
