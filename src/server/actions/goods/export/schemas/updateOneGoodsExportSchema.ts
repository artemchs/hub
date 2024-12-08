import { type PrismaTransaction } from "~/server/db";
import { readOneGoodsExportSchema } from "./readOneGoodsExportSchema";
import { type UpdateOneGoodsExportSchemaInput } from "~/utils/validation/goods/export/schemas/updateOneGoodsExportSchema";
import { verifyGoodsExportSchemaPayload } from "./utils/verifyGoodsExportSchemaPayload";

export const updateOneGoodsExportSchema = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: UpdateOneGoodsExportSchemaInput;
}) => {
  await readOneGoodsExportSchema({ tx, payload: { id: payload.id } });

  await verifyGoodsExportSchemaPayload({ tx, payload });

  await tx.goodsExportSchemaToAdditionalId.deleteMany({
    where: { schemaId: payload.id },
  });

  await tx.goodsExportSchemaToInternalField.deleteMany({
    where: { schemaId: payload.id },
  });

  return tx.goodsExportSchema.update({
    where: { id: payload.id },
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
    include: {
      identifiers: {
        include: { identifier: true },
        orderBy: { index: "asc" },
      },
    },
  });
};
