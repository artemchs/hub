"use client";

import { Box, Button, Modal, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { api } from "~/trpc/react";
import { TableActions, TableState } from "~/types/table-store";

export function DeleteManyGoodsMediaModal({
    opened,
    close,
    tableStore,
}: {
    opened: boolean;
    close: () => void;
    tableStore: TableState & TableActions;
}) {
    const apiUtils = api.useUtils();

    const { mutate, isPending } = api.media.deleteMany.useMutation({
        async onSuccess({ results }) {
            // Get IDs of successfully deleted items
            const deletedIds = results
                .filter((result) => result.success)
                .map((result) => result.id);

            // Create new row selection excluding deleted IDs
            const newRowSelection = Object.fromEntries(
                Object.entries(tableStore.rowSelection).filter(
                    ([id]) => !deletedIds.includes(id)
                )
            );

            // Update row selection
            tableStore.setRowSelection(newRowSelection);

            await apiUtils.media.readMany.invalidate();
        },
    });

    return (
        <Modal opened={opened} onClose={close} title="Удалить записи медиа">
            <Text>Вы уверены что хотите удалить выбранные записи медиа?</Text>
            <Box className="flex flex-col gap-2 lg:flex-row-reverse mt-8">
                <Button
                    color="red"
                    className="w-full lg:w-fit"
                    onClick={() => {
                        mutate({ selectedRows: tableStore.rowSelection });
                        close();
                    }}
                    leftSection={<IconTrash className="h-4 w-4" />}
                    loading={isPending}
                >
                    Удалить
                </Button>
                <Button
                    variant="default"
                    className="w-full lg:w-fit"
                    onClick={close}
                >
                    Отмена
                </Button>
            </Box>
        </Modal>
    );
}
