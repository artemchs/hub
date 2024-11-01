import { type PrismaTransaction } from "~/server/db";
import { type CreateOneGoodsImportSchemaInput } from "~/utils/validation/goods/import/schemas/createOneGoodsImportSchema";

export const createOneGoodsImportSchema = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: CreateOneGoodsImportSchemaInput;
}) => {
  return tx.goodsImportSchema.create({
    data: {
      name: payload.name,
      schema: payload.schema,
    },
  });
};
