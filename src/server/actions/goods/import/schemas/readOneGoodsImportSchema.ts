import { type PrismaTransaction } from "~/server/db";
import { type ReadOneGoodsImportSchemaInput } from "~/utils/validation/goods/import/schemas/readOneGoodsImportSchema";

export const readOneGoodsImportSchema = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadOneGoodsImportSchemaInput;
}) => {
  const goodsImportSchema = await tx.goodsImportSchema.findUnique({
    where: {
      id: payload.id,
    },
  });

  if (!goodsImportSchema) {
    throw new Error("Goods import schema not found");
  }

  return goodsImportSchema;
};
