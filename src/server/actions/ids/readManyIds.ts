import { type PrismaTransaction } from "~/server/db";
import { type ReadManyIdsInput } from "~/utils/validation/ids/readManyIds";
import { type Prisma } from "@prisma/client";

export const readManyIds = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadManyIdsInput;
}) => {
  const { search, filters, page, limit, orderBy } = payload;

  const query: Prisma.GoodsIdFindManyArgs = {
    where: {},
    take: limit,
    skip: (page - 1) * limit,
    orderBy:
      orderBy?.field && orderBy.direction
        ? { [orderBy.field]: orderBy.direction }
        : undefined,
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

  const [items, count] = await Promise.all([
    tx.goodsId.findMany(query),
    tx.goodsId.count({ where: query.where }),
  ]);

  return {
    items,
    count,
  };
};
