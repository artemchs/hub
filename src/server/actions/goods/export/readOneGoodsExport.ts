import { type PrismaTransaction } from "~/server/db";
import { type ReadOneGoodsExportInput } from "~/utils/validation/goods/export/readOneGoodsExport";

export const readOneGoodsExport = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadOneGoodsExportInput;
}) => {
  const goodsExport = await tx.goodsExport.findUnique({
    where: {
      id: payload.id,
    },
    include: {
      schema: true,
    },
  });

  if (!goodsExport) {
    throw new Error("Goods export not found");
  }

  return goodsExport;
};
