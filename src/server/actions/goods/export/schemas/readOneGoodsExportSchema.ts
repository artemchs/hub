import { type PrismaTransaction } from "~/server/db";
import { type ReadOneGoodsExportSchemaInput } from "~/utils/validation/goods/export/schemas/readOneGoodsExportSchema";

export const readOneGoodsExportSchema = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadOneGoodsExportSchemaInput;
}) => {
  const schema = await tx.goodsExportSchema.findUnique({
    where: { id: payload.id },
    include: {
      identifiers: {
        include: { identifier: true },
        orderBy: { index: "asc" },
      },
      internalFields: {
        include: { internalField: true },
        orderBy: { columnName: "asc" },
      },
    },
  });

  if (!schema) {
    throw new Error("Goods export schema not found");
  }

  return schema;
};
