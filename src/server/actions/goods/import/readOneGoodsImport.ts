import { type PrismaTransaction } from "~/server/db";
import { type ReadOneGoodsImportInput } from "~/utils/validation/goods/import/readOneGoodsImport";

export const readOneGoodsImport = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadOneGoodsImportInput;
}) => {
  const goodsImport = await tx.goodsImport.findFirst({
    where: {
      id: payload.id,
    },
    include: {
      schema: true,
    },
  });

  if (!goodsImport) {
    throw new Error("Goods import not found");
  }

  return goodsImport;
};
