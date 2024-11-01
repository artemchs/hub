import { type PrismaTransaction } from "~/server/db";
import { type ReadManyMediaInput } from "~/utils/validation/media/readManyMedia";
import { Prisma } from "@prisma/client";

export const readManyMedia = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadManyMediaInput;
}) => {
  const { search, filters, cursor, limit, orderBy } = payload;

  const query: Prisma.GoodsMediaFindManyArgs = {
    where: {},
    take: limit,
    cursor: cursor ? { id: cursor } : undefined,
    skip: cursor ? 1 : 0,
    orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : undefined,
  };

  if (query.where) {
    if (search) {
      query.where.key = {
        contains: search,
        mode: "insensitive",
      };
    }

    // TODO: Add filters here...
  }

  return await Promise.all([
    tx.goodsMedia.findMany(query),
    tx.goodsMedia.count({ where: query.where }),
  ]);
};
