import { type PrismaTransaction } from "~/server/db";
import { type ReadManyGoodsImportsInput } from "~/utils/validation/goods/import/readManyGoodsImports";
import { type Prisma } from "@prisma/client";

export const readManyGoodsImports = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadManyGoodsImportsInput;
}) => {
  const { search, filters, cursor, limit, orderBy } = payload;

  const query: Prisma.GoodsImportFindManyArgs = {
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
          fileKey: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    if (filters?.schemaId) {
      query.where.schemaId = filters.schemaId;
    }

    if (filters?.status) {
      query.where.status = filters.status;
    }
  }

  return await Promise.all([
    tx.goodsImport.findMany(query),
    tx.goodsImport.count({ where: query.where }),
  ]);
};
