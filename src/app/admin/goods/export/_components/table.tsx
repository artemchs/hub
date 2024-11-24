"use client";

import { useGoodsExportTable } from "~/app/stores/table-stores";
import { api } from "~/trpc/react";
import { DataTable } from "~/components/table/DataTable";
import { goodsExportColumns } from "./columns";
import { GoodsExportTableRowActions } from "./row-actions";
import { GoodsExportTableCustomActions } from "./custom-actions";
import { type ReadManyGoodsExportsInput } from "~/utils/validation/goods/export/readManyGoodsExports";

export function GoodsExportTable() {
  const tableStore = useGoodsExportTable();

  const { data, isLoading, error, isError, isFetching } =
    api.goods.export.readMany.useQuery({
      columnFilters: tableStore.columnFilters,
      columnFilterFns:
        tableStore.columnFilterFns as ReadManyGoodsExportsInput["columnFilterFns"],
      globalFilter: tableStore.globalFilter,
      sorting: tableStore.sorting,
      pagination: tableStore.pagination,
    });

  return (
    <DataTable
      columns={goodsExportColumns}
      data={data}
      renderRowActions={({ row }) => (
        <GoodsExportTableRowActions id={row.original.id} />
      )}
      renderTopToolbarCustomActions={({ table }) => (
        <GoodsExportTableCustomActions table={table} />
      )}
      tableStore={tableStore}
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
      isFetching={isFetching}
    />
  );
}
