"use client";

import { useGoodsImportTable } from "~/app/stores/table-stores";
import { api } from "~/trpc/react";
import { DataTable } from "~/components/table/DataTable";
import { goodsImportColumns } from "./columns";
import { GoodsImportTableRowActions } from "./row-actions";
import { GoodsImportTableCustomActions } from "./custom-actions";
import { type ReadManyGoodsImportsInput } from "~/utils/validation/goods/import/readManyGoodsImports";

export function GoodsImportTable() {
  const tableStore = useGoodsImportTable();

  const { data, isLoading, error, isError, isFetching } =
    api.goods.import.readMany.useQuery({
      columnFilters: tableStore.columnFilters,
      columnFilterFns:
        tableStore.columnFilterFns as ReadManyGoodsImportsInput["columnFilterFns"],
      globalFilter: tableStore.globalFilter,
      sorting: tableStore.sorting,
      pagination: tableStore.pagination,
    });

  return (
    <DataTable
      columns={goodsImportColumns}
      data={data}
      renderRowActions={({ row }) => (
        <GoodsImportTableRowActions id={row.original.id} />
      )}
      renderTopToolbarCustomActions={({ table }) => (
        <GoodsImportTableCustomActions table={table} />
      )}
      tableStore={tableStore}
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
      isFetching={isFetching}
    />
  );
}
