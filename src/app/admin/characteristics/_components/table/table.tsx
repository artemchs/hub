"use client";

import { useGoodsCharacteristicsTable } from "~/app/stores/table-stores";
import { api } from "~/trpc/react";
import { DataTable } from "~/components/table/DataTable";
import { type ReadManyCharacteristicsInput } from "~/utils/validation/characteristics/readManyCharacteristics";
import { goodsCharacteristicsColumns } from "./columns";
import { GoodsCharacteristicsTableRowActions } from "./row-actions";
import { GoodsCharacteristicsTableCustomActions } from "./custom-actions";

export function GoodsCharacteristicsTable() {
  const tableStore = useGoodsCharacteristicsTable();

  const { data, isLoading, error, isError, isFetching } =
    api.characteristics.readMany.useQuery({
      columnFilters: tableStore.columnFilters,
      columnFilterFns:
        tableStore.columnFilterFns as ReadManyCharacteristicsInput["columnFilterFns"],
      globalFilter: tableStore.globalFilter,
      sorting: tableStore.sorting,
      pagination: tableStore.pagination,
    });

  return (
    <DataTable
      columns={goodsCharacteristicsColumns}
      data={data}
      renderRowActions={({ row }) => (
        <GoodsCharacteristicsTableRowActions id={row.original.id} />
      )}
      renderTopToolbarCustomActions={({ table }) => (
        <GoodsCharacteristicsTableCustomActions table={table} />
      )}
      tableStore={tableStore}
      isLoading={isLoading}
      isError={isError}
      errorMessage={error?.message}
      isFetching={isFetching}
    />
  );
}
