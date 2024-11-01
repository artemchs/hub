import { type PrismaTransaction } from "~/server/db";
import { type DeleteOneGoodsImportSchemaInput } from "~/utils/validation/goods/import/schemas/deleteOneGoodsImportSchema";
import { readOneGoodsImportSchema } from "./readOneGoodsImportSchema";

export const deleteOneGoodsImportSchema = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: DeleteOneGoodsImportSchemaInput;
}) => {
  await readOneGoodsImportSchema({ tx, payload: { id: payload.id } });

  return tx.goodsImportSchema.delete({
    where: {
      id: payload.id,
    },
  });
};
