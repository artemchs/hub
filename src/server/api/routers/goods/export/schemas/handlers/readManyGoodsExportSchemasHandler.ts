import {
  readManyGoodsExportSchemas,
  readManyGoodsExportSchemasInfinite,
} from "~/server/actions/goods/export/schemas/readManyGoodsExportSchemas";
import { protectedProcedure } from "~/server/api/trpc";
import {
  readManyGoodsExportSchemasInfiniteSchema,
  readManyGoodsExportSchemasSchema,
} from "~/utils/validation/goods/export/schemas/readManyGoodsExportSchemas";

export const readManyGoodsExportSchemasHandler = protectedProcedure
  .input(readManyGoodsExportSchemasSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readManyGoodsExportSchemas({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read goods export schemas");
    }
  });

export const readManyGoodsExportSchemasInfiniteHandler = protectedProcedure
  .input(readManyGoodsExportSchemasInfiniteSchema)
  .query(async ({ input, ctx }) => {
    try {
      return readManyGoodsExportSchemasInfinite({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to read goods export schemas");
    }
  });
