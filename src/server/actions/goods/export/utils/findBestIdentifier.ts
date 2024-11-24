import { type PrismaTransaction } from "~/server/db";

export async function findBestIdentifier({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: {
    schemaId: string;
    goodId: string;
  };
}) {
  const identifiersToSchema = await tx.goodsExportSchemaToAdditionalId.findMany(
    {
      where: {
        schemaId: payload.schemaId,
      },
      orderBy: {
        index: "asc",
      },
    }
  );

  const ids: string[] = [];

  for (const { identifierId } of identifiersToSchema) {
    const idValue = await tx.goodsIdValue.findFirst({
      where: {
        goodsIdId: identifierId,
        goods: {
          some: {
            id: payload.goodId,
          },
        },
      },
    });

    if (idValue) {
      ids.push(idValue.value);
    }
  }

  ids.push(payload.goodId);

  return ids[0];
}
