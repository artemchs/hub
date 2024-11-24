import { readOneGoodsExport } from "~/server/actions/goods/export/readOneGoodsExport";
import { protectedProcedure } from "~/server/api/trpc";
import { readOneGoodsExportSchema } from "~/utils/validation/goods/export/readOneGoodsExport";

export const readOneGoodsExportHandler = protectedProcedure
  .input(readOneGoodsExportSchema)
  .query(async ({ ctx, input }) => {
    try {
      return readOneGoodsExport({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create goods export schema");
    }
  });
