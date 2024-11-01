import { type PrismaTransaction } from "~/server/db";
import { type ReadManyAttributeValuesInput } from "~/utils/validation/attributes/values/readManyAttributeValues";
import { Prisma } from "@prisma/client";

export const readManyAttributeValues = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadManyAttributeValuesInput;
}) => {
  const { search, filters, cursor, limit, orderBy } = payload;

  const query: Prisma.GoodsAttributeValueFindManyArgs = {
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
      query.where.attributeId = filters.parentId;
    }
  }

  return await Promise.all([
    tx.goodsAttributeValue.findMany(query),
    tx.goodsAttributeValue.count({ where: query.where }),
  ]);
};
