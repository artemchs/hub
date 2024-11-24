import { type PrismaTransaction } from "~/server/db";
import { type DeleteOneGoodsExportSchemaInput } from "~/utils/validation/goods/export/schemas/deleteOneGoodsExportSchema";
import { readOneGoodsExportSchema } from "./readOneGoodsExportSchema";

export const deleteOneGoodsExportSchema = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: DeleteOneGoodsExportSchemaInput;
}) => {
  await readOneGoodsExportSchema({ tx, payload: { id: payload.id } });

  return tx.goodsExportSchema.delete({
    where: { id: payload.id },
  });
};
