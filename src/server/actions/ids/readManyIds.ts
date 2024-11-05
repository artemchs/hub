import { type Prisma } from "@prisma/client";
import { type MRT_FilterOption } from "mantine-react-table";
import { type PrismaTransaction } from "~/server/db";
import { safeToString } from "~/utils/miscellaneous/safeToString";
import { type ReadManyIdsInput } from "~/utils/validation/ids/readManyIds";

function mapColumnFilterToPrismaCondition({
  columnFilterFn,
  id,
  value,
}: {
  id: string;
  columnFilterFn: MRT_FilterOption;
  value: unknown;
}) {
  // Handle invalid input cases
  if (value === null || value === undefined || value === "") {
    return {};
  }

  // Handle array of empty strings
  if (
    Array.isArray(value) &&
    value.every((v) => v === "" || v === null || v === undefined)
  ) {
    return {};
  }

  switch (columnFilterFn) {
    case "equals":
      return typeof value === "string"
        ? { [id]: { equals: value, mode: "insensitive" } }
        : { [id]: { equals: value } };

    case "notEquals":
      return typeof value === "string"
        ? { [id]: { not: value, mode: "insensitive" } }
        : { [id]: { not: value } };

    case "contains":
      return { [id]: { contains: safeToString(value), mode: "insensitive" } };

    case "startsWith":
      return { [id]: { startsWith: safeToString(value), mode: "insensitive" } };

    case "endsWith":
      return { [id]: { endsWith: safeToString(value), mode: "insensitive" } };

    case "empty":
      return { [id]: { equals: null } };

    case "notEmpty":
      return { [id]: { not: null } };

    case "greaterThan":
      return { [id]: { gt: value } };

    case "greaterThanOrEqualTo":
      return { [id]: { gte: value } };

    case "lessThan":
      return { [id]: { lt: value } };

    case "lessThanOrEqualTo":
      return { [id]: { lte: value } };

    case "between":
      if (Array.isArray(value)) {
        return {
          AND: [
            {
              [id]:
                value[0] && value[0] !== ""
                  ? { gt: value[0] as unknown }
                  : undefined,
            },
            {
              [id]:
                value[1] && value[1] !== ""
                  ? { lt: value[1] as unknown }
                  : undefined,
            },
          ],
        };
      }
      return {};

    case "betweenInclusive":
      if (Array.isArray(value)) {
        return {
          AND: [
            {
              [id]:
                value[0] && value[0] !== ""
                  ? { gte: value[0] as unknown }
                  : undefined,
            },
            {
              [id]:
                value[1] && value[1] !== ""
                  ? { lte: value[1] as unknown }
                  : undefined,
            },
          ],
        };
      }
      return {};

    case "includesString":
      return { [id]: { contains: safeToString(value), mode: "insensitive" } };

    case "includesStringSensitive":
      return { [id]: { contains: safeToString(value) } };

    case "equalsString":
      return { [id]: { equals: safeToString(value), mode: "insensitive" } };

    case "arrIncludes":
      return { [id]: { has: value } };

    case "arrIncludesAll":
      if (Array.isArray(value)) {
        return { [id]: { hasEvery: value } };
      }
      return { [id]: { has: value } };

    case "arrIncludesSome":
      if (Array.isArray(value)) {
        return { [id]: { hasSome: value } };
      }
      return { [id]: { has: value } };

    case "weakEquals":
      return typeof value === "string"
        ? { [id]: { equals: value, mode: "insensitive" } }
        : { [id]: { equals: value } };

    case "inNumberRange":
      if (Array.isArray(value)) {
        return {
          AND: [
            { [id]: value[0] ? { gte: Number(value[0]) } : undefined },
            { [id]: value[1] ? { lte: Number(value[1]) } : undefined },
          ],
        };
      }
      return {};

    case "fuzzy":
      return { [id]: { contains: safeToString(value), mode: "insensitive" } };

    default:
      return {};
  }
}

export const readManyIds = async ({
  tx,
  payload,
}: {
  tx: PrismaTransaction;
  payload: ReadManyIdsInput;
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

  console.log({ filterConditions: JSON.stringify(filterConditions, null, 2) });

  // Add global filter if present
  if (payload.globalFilter) {
    filterConditions.push({
      name: { contains: payload.globalFilter, mode: "insensitive" },
    });
  }

  const where: Prisma.GoodsIdWhereInput = {
    AND: filterConditions.length > 0 ? filterConditions : undefined,
  };

  // Build orderBy from sorting
  const orderBy = payload.sorting.map((sort) => ({
    [sort.id]: sort.desc ? "desc" : "asc",
  }));

  const [items, total] = await Promise.all([
    tx.goodsId.findMany({
      skip: payload.pagination.pageIndex * payload.pagination.pageSize,
      take: payload.pagination.pageSize,
      where,
      orderBy,
    }),
    tx.goodsId.count({ where }),
  ]);

  return {
    items,
    total,
    pageCount: Math.ceil(total / payload.pagination.pageSize),
  };
};
