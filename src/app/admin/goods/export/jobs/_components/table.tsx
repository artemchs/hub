"use client";

import { useGoodsExportSchemasTable } from "~/app/stores/table-stores";
import { api } from "~/trpc/react";
import { DataTable } from "~/components/table/DataTable";
import { goodsExportJobsColumns } from "./columns";
import { GoodsExportJobTableRowActions } from "./row-actions";
import { GoodsExportJobsTableCustomActions } from "./custom-actions";
import { ReadManyGoodsExportJobsInput } from "~/utils/validation/goods/export/jobs";

export function GoodsExportJobsTable() {
    const tableStore = useGoodsExportSchemasTable();

    const { data, isLoading, error, isError, isFetching } =
        api.goods.export.jobs.readMany.useQuery({
            columnFilters: tableStore.columnFilters,
            columnFilterFns:
                tableStore.columnFilterFns as ReadManyGoodsExportJobsInput["columnFilterFns"],
            globalFilter: tableStore.globalFilter,
            sorting: tableStore.sorting,
            pagination: tableStore.pagination,
        });

    return (
        <DataTable
            columns={goodsExportJobsColumns}
            data={data}
            renderRowActions={({ row }) => (
                <GoodsExportJobTableRowActions id={row.original.id} />
            )}
            renderTopToolbarCustomActions={({ table }) => (
                <GoodsExportJobsTableCustomActions table={table} />
            )}
            tableStore={tableStore}
            isLoading={isLoading}
            isError={isError}
            errorMessage={error?.message}
            isFetching={isFetching}
        />
    );
}
