import { deleteOneGoodsImportSchema } from "~/server/actions/goods/import/schemas/deleteOneGoodsImportSchema";
import { protectedProcedure } from "~/server/api/trpc";
import { deleteOneGoodsImportSchemaSchema } from "~/utils/validation/goods/import/schemas/deleteOneGoodsImportSchema";

export const deleteOneGoodsImportSchemaHandler = protectedProcedure
  .input(deleteOneGoodsImportSchemaSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return deleteOneGoodsImportSchema({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete goods import schema");
    }
  });
