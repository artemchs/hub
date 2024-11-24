import { createOneGoodsExportSchema } from "~/server/actions/goods/export/schemas/createOneGoodsExportSchema";
import { protectedProcedure } from "~/server/api/trpc";
import { createOneGoodsExportSchemaSchema } from "~/utils/validation/goods/export/schemas/createOneGoodsExportSchema";

export const createOneGoodsExportSchemaHandler = protectedProcedure
  .input(createOneGoodsExportSchemaSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return createOneGoodsExportSchema({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create goods export schema");
    }
  });
