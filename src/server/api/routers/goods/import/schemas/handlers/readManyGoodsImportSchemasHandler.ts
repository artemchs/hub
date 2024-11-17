import {
  readManyGoodsImportSchemas,
  readManyGoodsImportSchemasInfinite,
} from "~/server/actions/goods/import/schemas/readManyGoodsImportSchemas";
import { protectedProcedure } from "~/server/api/trpc";
import {
  readManyGoodsImportSchemasInfiniteSchema,
  readManyGoodsImportSchemasSchema,
} from "~/utils/validation/goods/import/schemas/readManyGoodsImportSchemas";

export const readManyGoodsImportSchemasHandler = protectedProcedure
  .input(readManyGoodsImportSchemasSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readManyGoodsImportSchemas({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read goods import schemas");
    }
  });

export const readManyGoodsImportSchemasInfiniteHandler = protectedProcedure
  .input(readManyGoodsImportSchemasInfiniteSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readManyGoodsImportSchemasInfinite({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read goods import schemas");
    }
  });
