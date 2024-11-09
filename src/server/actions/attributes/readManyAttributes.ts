import { type PrismaTransaction } from "~/server/db";
import { type Prisma } from "@prisma/client";
import { mapColumnFilterToPrismaCondition } from "~/utils/table/mapColumnFilterToPrismaCondition";
import type {
  ReadManyAttributesInfiniteInput,
  ReadManyAttributesInput,
} from "~/utils/validation/attributes/readManyAttributes";

export const readManyAttributes = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadManyAttributesInput;
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

  const where: Prisma.GoodsAttributeWhereInput = {
    AND: filterConditions.length > 0 ? filterConditions : undefined,
  };

  // Build orderBy from sorting
  const orderBy = payload.sorting.map((sort) => ({
    [sort.id]: sort.desc ? "desc" : "asc",
  }));

  const [items, total] = await Promise.all([
    tx.goodsAttribute.findMany({
      skip: payload.pagination.pageIndex * payload.pagination.pageSize,
      take: payload.pagination.pageSize,
      where,
      orderBy,
    }),
    tx.goodsAttribute.count({ where }),
  ]);

  return {
    items,
    total,
    pageCount: Math.ceil(total / payload.pagination.pageSize),
  };
};

export const readManyAttributesInfinite = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadManyAttributesInfiniteInput;
}) => {
  const items = await tx.goodsAttribute.findMany({
    take: payload.limit + 1,
    where: {
      name: {
        contains: payload.globalFilter,
        mode: "insensitive",
      },
    },
    cursor: payload.cursor ? { id: payload.cursor } : undefined,
    orderBy: {
      createdAt: "desc",
    },
  });

  let nextCursor: typeof payload.cursor | undefined = undefined;
  if (items.length > payload.limit) {
    const nextItem = items.pop();
    nextCursor = nextItem!.id;
  }
  return {
    items,
    nextCursor,
  };
};
