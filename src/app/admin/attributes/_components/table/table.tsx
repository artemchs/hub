"use client";

import { useGoodsAttributesTable } from "~/app/stores/table-stores";
import { api } from "~/trpc/react";
import { DataTable } from "~/components/table/DataTable";
import { goodsAttributesColumns } from "./columns";
import { GoodsAttributesTableRowActions } from "./row-actions";
import { GoodsAttributesTableCustomActions } from "./custom-actions";
import { type ReadManyAttributesInput } from "~/utils/validation/attributes/readManyAttributes";

export function GoodsAttributesTable() {
  const tableStore = useGoodsAttributesTable();

  const { data, isLoading, error, isError, isFetching } =
    api.attributes.readMany.useQuery({
      columnFilters: tableStore.columnFilters,
      columnFilterFns:
        tableStore.columnFilterFns as ReadManyAttributesInput["columnFilterFns"],
      globalFilter: tableStore.globalFilter,
      sorting: tableStore.sorting,
      pagination: tableStore.pagination,
    });

  return (
    <DataTable
      columns={goodsAttributesColumns}
      data={data}
      renderRowActions={({ row }) => (
        <GoodsAttributesTableRowActions id={row.original.id} />
      )}
      renderTopToolbarCustomActions={({ table }) => (
        <GoodsAttributesTableCustomActions table={table} />
      )}
      tableStore={tableStore}
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
      isFetching={isFetching}
    />
  );
}
