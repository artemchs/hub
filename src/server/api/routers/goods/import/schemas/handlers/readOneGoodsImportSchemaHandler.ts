import { readOneGoodsImportSchema } from "~/server/actions/goods/import/schemas/readOneGoodsImportSchema";
import { protectedProcedure } from "~/server/api/trpc";
import { readOneGoodsImportSchemaSchema } from "~/utils/validation/goods/import/schemas/readOneGoodsImportSchema";

export const readOneGoodsImportSchemaHandler = protectedProcedure
  .input(readOneGoodsImportSchemaSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readOneGoodsImportSchema({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read goods import schema");
    }
  });
