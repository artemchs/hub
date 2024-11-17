"use client";

import { useGoodsImportSchemasTable } from "~/app/stores/table-stores";
import { api } from "~/trpc/react";
import { DataTable } from "~/components/table/DataTable";
import { goodsImportSchemasColumns } from "./columns";
import { GoodsImportSchemasTableRowActions } from "./row-actions";
import { GoodsImportSchemasTableCustomActions } from "./custom-actions";
import { type ReadManyGoodsImportSchemasInput } from "~/utils/validation/goods/import/schemas/readManyGoodsImportSchemas";

export function GoodsImportSchemasTable() {
  const tableStore = useGoodsImportSchemasTable();

  const { data, isLoading, error, isError, isFetching } =
    api.goods.import.schemas.readMany.useQuery({
      columnFilters: tableStore.columnFilters,
      columnFilterFns:
        tableStore.columnFilterFns as ReadManyGoodsImportSchemasInput["columnFilterFns"],
      globalFilter: tableStore.globalFilter,
      sorting: tableStore.sorting,
      pagination: tableStore.pagination,
    });

  return (
    <DataTable
      columns={goodsImportSchemasColumns}
      data={data}
      renderRowActions={({ row }) => (
        <GoodsImportSchemasTableRowActions id={row.original.id} />
      )}
      renderTopToolbarCustomActions={({ table }) => (
        <GoodsImportSchemasTableCustomActions table={table} />
      )}
      tableStore={tableStore}
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
      isFetching={isFetching}
    />
  );
}
