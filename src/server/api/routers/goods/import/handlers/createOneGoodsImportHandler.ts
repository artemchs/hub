import { createOneGoodsImport } from "~/server/actions/goods/import/createOneGoodsImport";
import { protectedProcedure } from "~/server/api/trpc";
import { createOneGoodsImportSchema } from "~/utils/validation/goods/import/createOneGoodsImport";

export const createOneGoodsImportHandler = protectedProcedure
  .input(createOneGoodsImportSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return createOneGoodsImport({
        tx: ctx.db,
        storage: ctx.storage,
        payload: input,
      });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create goods import");
    }
  });
