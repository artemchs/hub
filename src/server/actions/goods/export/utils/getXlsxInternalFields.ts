import { PrismaTransaction } from "~/server/db";

export async function getXlsxInternalFields({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: {
    schemaId: string;
    goodId: string;
  };
}) {
  const columns: Record<string, string> = {};

  const internalFields = await tx.goodsInternalFieldToGood.findMany({
    where: {
      goodId: payload.goodId,
      field: {
        exportSchemas: {
          some: {
            schemaId: payload.schemaId,
          },
        },
      },
    },
    include: {
      values: {
        orderBy: {
          value: "asc",
        },
      },
      field: {
        include: {
          exportSchemas: {
            where: {
              schemaId: payload.schemaId,
            },
          },
        },
      },
    },
  });

  for (const { values, field } of internalFields) {
    const columnName = field?.exportSchemas[0]?.columnName ?? field?.name ?? "";

    columns[columnName] =
      values.length > 0 ? values.map(({ value }) => value).join(", ") : "";
  }

  return columns;
}
