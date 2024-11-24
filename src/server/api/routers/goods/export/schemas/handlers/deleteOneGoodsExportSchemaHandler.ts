import { deleteOneGoodsExportSchema } from "~/server/actions/goods/export/schemas/deleteOneGoodsExportSchema";
import { protectedProcedure } from "~/server/api/trpc";
import { deleteOneGoodsExportSchemaSchema } from "~/utils/validation/goods/export/schemas/deleteOneGoodsExportSchema";

export const deleteOneGoodsExportSchemaHandler = protectedProcedure
  .input(deleteOneGoodsExportSchemaSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return deleteOneGoodsExportSchema({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete goods export schema");
    }
  });