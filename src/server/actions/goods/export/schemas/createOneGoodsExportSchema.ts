import { type PrismaTransaction } from "~/server/db";
import { type CreateOneGoodsExportSchemaInput } from "~/utils/validation/goods/export/schemas/createOneGoodsExportSchema";
import { verifyGoodsExportSchemaPayload } from "./utils/verifyGoodsExportSchemaPayload";

export const createOneGoodsExportSchema = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: CreateOneGoodsExportSchemaInput;
}) => {
  await verifyGoodsExportSchemaPayload({ tx, payload });

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
      internalFields:
        payload.template.startsWith("XLSX") &&
        payload.internalFields &&
        payload.internalFields.length > 0
          ? {
              create: payload.internalFields.map(({ id, columnName }) => ({
                internalField: { connect: { id } },
                columnName,
              })),
            }
          : undefined,
    },
  });
};
