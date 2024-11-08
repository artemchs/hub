import { type PrismaTransaction } from "~/server/db";
import { type ReadManyCategoriesInput } from "~/utils/validation/categories/readManyCategories";
import { type Prisma } from "@prisma/client";
import { mapColumnFilterToPrismaCondition } from "~/utils/table/mapColumnFilterToPrismaCondition";

export const readManyCategories = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadManyCategoriesInput;
}) => {
  // Convert filters to Prisma conditions
  const filterConditions =
    payload.columnFilters?.map(({ id, value }) =>
      mapColumnFilterToPrismaCondition({
        id,
        value,
        columnFilterFn: payload.columnFilterFns[id] ?? "equals",
      })
    ) || [];

  // Add global filter if present
  if (payload.globalFilter) {
    filterConditions.push({
      name: { contains: payload.globalFilter, mode: "insensitive" },
    });
  }

  const where: Prisma.GoodsCategoryWhereInput = {
    AND: filterConditions.length > 0 ? filterConditions : undefined,
  };

  // Build orderBy from sorting
  const orderBy = payload.sorting.map((sort) => ({
    [sort.id]: sort.desc ? "desc" : "asc",
  }));

  const [items, total] = await Promise.all([
    tx.goodsCategory.findMany({
      skip: payload.pagination.pageIndex * payload.pagination.pageSize,
      take: payload.pagination.pageSize,
      where,
      orderBy,
    }),
    tx.goodsCategory.count({ where }),
  ]);

  return {
    items,
    total,
    pageCount: Math.ceil(total / payload.pagination.pageSize),
  };
};
