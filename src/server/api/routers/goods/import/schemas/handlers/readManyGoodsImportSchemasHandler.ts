import { readManyGoodsImportsSchemas } from "~/server/actions/goods/import/schemas/readManyGoodsImportSchemas";
import { protectedProcedure } from "~/server/api/trpc";
import { readManyGoodsImportSchemasSchema } from "~/utils/validation/goods/import/schemas/readManyGoodsImportSchemas";

export const readManyGoodsImportSchemasHandler = protectedProcedure
  .input(readManyGoodsImportSchemasSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readManyGoodsImportsSchemas({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read goods import schemas");
    }
  });
