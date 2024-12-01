"use client";

import { useGoodsCharacteristicsTable } from "~/app/stores/table-stores";
import { api } from "~/trpc/react";
import { DataTable } from "~/components/table/DataTable";
import type { ReadManyInternalFieldsInput } from "~/utils/validation/internal-fields/readManyInternalFields";
import { goodsInternalFieldsColumns } from "./columns";
import { GoodsInternalFieldsTableRowActions } from "./row-actions";
import { GoodsInternalFieldsTableCustomActions } from "./custom-actions";

export function GoodsInternalFieldsTable() {
  const tableStore = useGoodsCharacteristicsTable();

  const { data, isLoading, error, isError, isFetching } =
    api.internalFields.readMany.useQuery({
      columnFilters: tableStore.columnFilters,
      columnFilterFns:
        tableStore.columnFilterFns as ReadManyInternalFieldsInput["columnFilterFns"],
      globalFilter: tableStore.globalFilter,
      sorting: tableStore.sorting,
      pagination: tableStore.pagination,
    });

  return (
    <DataTable
      columns={goodsInternalFieldsColumns}
      data={data}
      renderRowActions={({ row }) => (
        <GoodsInternalFieldsTableRowActions id={row.original.id} />
      )}
      renderTopToolbarCustomActions={({ table }) => (
        <GoodsInternalFieldsTableCustomActions table={table} />
      )}
      tableStore={tableStore}
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
      isFetching={isFetching}
    />
  );
}
