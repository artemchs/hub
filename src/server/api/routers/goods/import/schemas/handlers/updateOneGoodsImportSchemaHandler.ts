import { updateOneGoodsImportSchema } from "~/server/actions/goods/import/schemas/updateOneGoodsImportSchema";
import { protectedProcedure } from "~/server/api/trpc";
import { updateOneGoodsImportSchemaSchema } from "~/utils/validation/goods/import/schemas/updateOneGoodsImportSchema";

export const updateOneGoodsImportSchemaHandler = protectedProcedure
  .input(updateOneGoodsImportSchemaSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      return updateOneGoodsImportSchema({ tx: ctx.db, payload: input });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update goods import schema");
    }
  });
