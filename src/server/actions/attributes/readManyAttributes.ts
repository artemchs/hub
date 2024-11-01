import { PrismaTransaction } from "~/server/db";
import { ReadManyAttributesInput } from "~/utils/validation/attributes/readManyAttributes";
import { Prisma } from "@prisma/client";

export const readManyAttributes = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadManyAttributesInput;
}) => {
  const { search, filters, cursor, limit, orderBy } = payload;

  const query: Prisma.GoodsAttributeFindManyArgs = {
    where: {},
    take: limit,
    cursor: cursor ? { id: cursor } : undefined,
    skip: cursor ? 1 : 0,
    orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : undefined,
  };

  if (query.where) {
    if (search) {
      query.where.name = {
        contains: search,
        mode: "insensitive",
      };
    }

    // TODO: Add filters here...
  }

  return await Promise.all([
    tx.goodsAttribute.findMany(query),
    tx.goodsAttribute.count({ where: query.where }),
  ]);
};
