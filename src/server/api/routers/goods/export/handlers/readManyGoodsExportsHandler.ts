import { readManyGoodsExports } from "~/server/actions/goods/export/readManyGoodsExports";
import { protectedProcedure } from "~/server/api/trpc";
import { readManyGoodsExportsSchema } from "~/utils/validation/goods/export/readManyGoodsExports";

export const readManyGoodsExportsHandler = protectedProcedure
  .input(readManyGoodsExportsSchema)
  .query(async ({ ctx, input }) => {
    try {
      return readManyGoodsExports({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read goods exports");
    }
  });
