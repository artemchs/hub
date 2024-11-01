import { type PrismaTransaction } from "~/server/db";
import { type ReadManyGoodsInput } from "~/utils/validation/goods/readManyGoods";
import { type Prisma } from "@prisma/client";

export const readManyGoods = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadManyGoodsInput;
}) => {
  const { search, filters, cursor, limit, orderBy } = payload;

  const query: Prisma.GoodFindManyArgs = {
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
        {
          sku: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    if (filters?.categoryIds) {
      query.where.categoryId = {
        in: filters.categoryIds,
      };
    }

    if (filters?.attributeValueIds) {
      query.where.attributeValues = {
        some: {
          id: {
            in: filters.attributeValueIds,
          },
        },
      };
    }

    if (filters?.idValueIds) {
      query.where.idValues = {
        some: {
          id: {
            in: filters.idValueIds,
          },
        },
      };
    }

    if (filters?.mediaIds) {
      query.where.mediaToGood = {
        some: {
          mediaId: {
            in: filters.mediaIds,
          },
        },
      };
    }
  }

  return await Promise.all([
    tx.good.findMany(query),
    tx.good.count({ where: query.where }),
  ]);
};
