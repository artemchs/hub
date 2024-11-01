import { createOneGoodsImportSchema } from "~/server/actions/goods/import/schemas/createOneGoodsImportSchema";
import { protectedProcedure } from "~/server/api/trpc";
import { createOneGoodsImportSchemaSchema } from "~/utils/validation/goods/import/schemas/createOneGoodsImportSchema";

export const createOneGoodsImportSchemaHandler = protectedProcedure
  .input(createOneGoodsImportSchemaSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return createOneGoodsImportSchema({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create goods import schema");
    }
  });
