import { updateOneGoodsExportSchema } from "~/server/actions/goods/export/schemas/updateOneGoodsExportSchema";
import { protectedProcedure } from "~/server/api/trpc";
import { updateOneGoodsExportSchemaSchema } from "~/utils/validation/goods/export/schemas/updateOneGoodsExportSchema";

export const updateOneGoodsExportSchemaHandler = protectedProcedure
  .input(updateOneGoodsExportSchemaSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return updateOneGoodsExportSchema({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update goods export schema");
    }
  });
