import { createOneGoodsExport } from "~/server/actions/goods/export/createOneGoodsExport";
import { protectedProcedure } from "~/server/api/trpc";
import { createOneGoodsExportSchema } from "~/utils/validation/goods/export/createOneGoodsExport";

export const createOneGoodsExportHandler = protectedProcedure
  .input(createOneGoodsExportSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return createOneGoodsExport({
        tx: ctx.db,
        storage: ctx.storage,
        payload: input,
      });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create goods export");
    }
  });
