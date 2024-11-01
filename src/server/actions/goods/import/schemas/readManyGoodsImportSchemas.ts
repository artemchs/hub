import { type PrismaTransaction } from "~/server/db";
import { type ReadManyGoodsImportSchemasInput } from "~/utils/validation/goods/import/schemas/readManyGoodsImportSchemas";
import { Prisma } from "@prisma/client";

export const readManyGoodsImportsSchemas = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadManyGoodsImportSchemasInput;
}) => {
  const { search, filters, cursor, limit, orderBy } = payload;

  const query: Prisma.GoodsImportSchemaFindManyArgs = {
    where: {},
    take: limit,
    cursor: cursor ? { id: cursor } : undefined,
    skip: cursor ? 1 : 0,
    orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : undefined,
  };

  if (query.where) {
    if (search) {
      query.where.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    // TODO: Add filters here...
  }

  return await Promise.all([
    tx.goodsImportSchema.findMany(query),
    tx.goodsImportSchema.count({ where: query.where }),
  ]);
};
