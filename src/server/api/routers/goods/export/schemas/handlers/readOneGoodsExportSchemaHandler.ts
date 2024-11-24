import { readOneGoodsExportSchema } from "~/server/actions/goods/export/schemas/readOneGoodsExportSchema";
import { protectedProcedure } from "~/server/api/trpc";
import { readOneGoodsExportSchemaSchema } from "~/utils/validation/goods/export/schemas/readOneGoodsExportSchema";

export const readOneGoodsExportSchemaHandler = protectedProcedure
  .input(readOneGoodsExportSchemaSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readOneGoodsExportSchema({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read goods export schema");
    }
  });
