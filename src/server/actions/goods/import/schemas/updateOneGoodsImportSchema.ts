import { type PrismaTransaction } from "~/server/db";
import { type UpdateOneGoodsImportSchemaInput } from "~/utils/validation/goods/import/schemas/updateOneGoodsImportSchema";
import { readOneGoodsImportSchema } from "./readOneGoodsImportSchema";

export const updateOneGoodsImportSchema = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: UpdateOneGoodsImportSchemaInput;
}) => {
  await readOneGoodsImportSchema({ tx, payload: { id: payload.id } });

  return tx.goodsImportSchema.update({
    where: {
      id: payload.id,
    },
    data: {
      name: payload.name,
      createNewEntries: payload.createNewEntries,
      updateExistingEntries: payload.updateExistingEntries,
      schema: payload.schema,
    },
  });
};
