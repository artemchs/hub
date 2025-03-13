"use client";

import { api } from "~/trpc/react";
import { DataTable } from "~/components/table/DataTable";
import { type ReadManyMediaInput } from "~/utils/validation/media/readManyMedia";
import { goodsMediaColumns } from "./columns";
import { GoodsMediaTableRowActions } from "./row-actions";
import { GoodsMediaTableCustomActions } from "./custom-actions";
import { useGoodsMediaTable } from "~/app/stores/table-stores";
import { Button, Group } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { DeleteManyGoodsMediaModal } from "~/components/admin/goods-media/DeleteManyGoodsMediaModal";

export function GoodsMediaTable() {
    const tableStore = useGoodsMediaTable();
    const [opened, { open, close }] = useDisclosure(false);

    const { data, isLoading, error, isError, isFetching } =
        api.media.readMany.useQuery({
            columnFilters: tableStore.columnFilters,
            columnFilterFns:
                tableStore.columnFilterFns as ReadManyMediaInput["columnFilterFns"],
            globalFilter: tableStore.globalFilter,
            sorting: tableStore.sorting,
            pagination: tableStore.pagination,
        });

    return (
        <>
            <DataTable
                tableOptions={{
                    enableRowSelection: true,
                    positionToolbarAlertBanner: "top",
                    renderToolbarAlertBannerContent({ selectedAlert, table }) {
                        return (
                            <Group p="xs" justify="space-between">
                                {selectedAlert}
                                <Group gap="xs">
                                    <Button
                                        leftSection={<IconTrash size={16} />}
                                        color="red"
                                        size="xs"
                                        onClick={open}
                                    >
                                        Удалить выбранные
                                    </Button>
                                </Group>
                            </Group>
                        );
                    },
                    getRowId: (row) => row.id,
                }}
                columns={goodsMediaColumns}
                data={data}
                renderRowActions={({ row }) => (
                    <GoodsMediaTableRowActions id={row.original.id} />
                )}
                renderTopToolbarCustomActions={({ table }) => (
                    <GoodsMediaTableCustomActions table={table} />
                )}
                tableStore={tableStore}
                isLoading={isLoading}
                isError={isError}
                errorMessage={error?.message}
                isFetching={isFetching}
            />
            <DeleteManyGoodsMediaModal
                close={close}
                opened={opened}
                tableStore={tableStore}
            />
        </>
    );
}
