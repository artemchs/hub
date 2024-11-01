import { readOneGoodsImport } from "~/server/actions/goods/import/readOneGoodsImport";
import { protectedProcedure } from "~/server/api/trpc";
import { readOneGoodsImportSchema } from "~/utils/validation/goods/import/readOneGoodsImport";

export const readOneGoodsImportHandler = protectedProcedure
  .input(readOneGoodsImportSchema)
  .query(async ({ ctx, input }) => {
    try {
      return readOneGoodsImport({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create goods import schema");
    }
  });
