import { z } from "zod";

// Column filter
const columnFilter = z.object({
  id: z.string(), // Column ID
  value: z.unknown(),
});

// Sorting
const sorting = z.array(
  z.object({
    id: z.string(), // Column ID
    desc: z.boolean(),
  })
);

// Pagination
const pagination = z.object({
  pageIndex: z.number().int().min(0), // Index of the current page
  pageSize: z.number().int().min(1), // Number of rows for the given page
});

// Final schema
export const readManyIdsSchema = z.object({
  columnFilters: z.array(columnFilter).default([]),
  columnFilterFns: z.record(
    z.enum([
      "between",
      "betweenInclusive",
      "contains",
      "empty",
      "endsWith",
      "equals",
      "fuzzy",
      "greaterThan",
      "greaterThanOrEqualTo",
      "lessThan",
      "lessThanOrEqualTo",
      "notEmpty",
      "notEquals",
      "startsWith",
      "includesString",
      "includesStringSensitive",
      "equalsString",
      "arrIncludes",
      "arrIncludesAll",
      "arrIncludesSome",
      "weakEquals",
      "inNumberRange",
    ])
  ),
  globalFilter: z.string().optional(),
  sorting: sorting.default([]),
  pagination: pagination.default({
    pageIndex: 0,
    pageSize: 20,
  }),
});

export type ReadManyIdsInput = z.infer<typeof readManyIdsSchema>;
