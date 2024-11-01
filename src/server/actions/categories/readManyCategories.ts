import { type PrismaTransaction } from "~/server/db";
import { type ReadManyCategoriesInput } from "~/utils/validation/categories/readManyCategories";
import { type Prisma } from "@prisma/client";

export const readManyCategories = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadManyCategoriesInput;
}) => {
  const { search, filters, page, limit, orderBy } = payload;

  const query: Prisma.GoodsCategoryFindManyArgs = {
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

    if (filters?.parentId) {
      query.where.parentId = filters.parentId;
    }
  }

  const [items, count] = await Promise.all([
    tx.goodsCategory.findMany(query),
    tx.goodsCategory.count({ where: query.where }),
  ]);

  return {
    items,
    count,
  };
};
