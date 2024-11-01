import { type PrismaTransaction } from "~/server/db";
import { type ReadManyIdValuesInput } from "~/utils/validation/ids/values/readManyIdValues";
import { type Prisma } from "@prisma/client";

export const readManyIdValues = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadManyIdValuesInput;
}) => {
  const { search, filters, cursor, limit, orderBy } = payload;

  const query: Prisma.GoodsIdValueFindManyArgs = {
    where: {},
    take: limit,
    cursor: cursor ? { id: cursor } : undefined,
    skip: cursor ? 1 : 0,
    orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : undefined,
  };

  if (query.where) {
    if (search) {
      query.where.value = {
        contains: search,
        mode: "insensitive",
      };
    }

    if (filters?.parentId) {
      query.where.goodsIdId = filters.parentId;
    }
  }

  return await Promise.all([
    tx.goodsIdValue.findMany(query),
    tx.goodsIdValue.count({ where: query.where }),
  ]);
};
