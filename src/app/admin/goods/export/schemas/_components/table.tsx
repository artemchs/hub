"use client";

import { useGoodsExportSchemasTable } from "~/app/stores/table-stores";
import { api } from "~/trpc/react";
import { DataTable } from "~/components/table/DataTable";
import { goodsExportSchemasColumns } from "./columns";
import { GoodsExportSchemasTableRowActions } from "./row-actions";
import { GoodsExportSchemasTableCustomActions } from "./custom-actions";
import { type ReadManyGoodsExportSchemasInput } from "~/utils/validation/goods/export/schemas/readManyGoodsExportSchemas";

export function GoodsExportSchemasTable() {
  const tableStore = useGoodsExportSchemasTable();

  const { data, isLoading, error, isError, isFetching } =
    api.goods.export.schemas.readMany.useQuery({
      columnFilters: tableStore.columnFilters,
      columnFilterFns:
        tableStore.columnFilterFns as ReadManyGoodsExportSchemasInput["columnFilterFns"],
      globalFilter: tableStore.globalFilter,
      sorting: tableStore.sorting,
      pagination: tableStore.pagination,
    });

  return (
    <DataTable
      columns={goodsExportSchemasColumns}
      data={data}
      renderRowActions={({ row }) => (
        <GoodsExportSchemasTableRowActions id={row.original.id} />
      )}
      renderTopToolbarCustomActions={({ table }) => (
        <GoodsExportSchemasTableCustomActions table={table} />
      )}
      tableStore={tableStore}
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
      isFetching={isFetching}
    />
  );
}
