import { readManyGoodsImports } from "~/server/actions/goods/import/readManyGoodsImports";
import { protectedProcedure } from "~/server/api/trpc";
import { readManyGoodsImportsSchema } from "~/utils/validation/goods/import/readManyGoodsImports";

export const readManyGoodsImportsHandler = protectedProcedure
  .input(readManyGoodsImportsSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readManyGoodsImports({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read goods imports");
    }
  });
