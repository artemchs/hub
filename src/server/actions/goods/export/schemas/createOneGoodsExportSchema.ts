import { type PrismaTransaction } from "~/server/db";
import { type CreateOneGoodsExportSchemaInput } from "~/utils/validation/goods/export/schemas/createOneGoodsExportSchema";

export const createOneGoodsExportSchema = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: CreateOneGoodsExportSchemaInput;
}) => {
  return tx.goodsExportSchema.create({
    data: {
      name: payload.name,
      template: payload.template,
      identifiers: {
        create: payload.identifierIds.map((id, index) => ({
          identifier: { connect: { id } },
          index,
        })),
      },
    },
  });
};
