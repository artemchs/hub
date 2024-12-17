"use client";

import { ActionIcon, Group } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import { DeleteOneGoodsTagModal } from "~/components/admin/goods-tags/DeleteOneGoodsTagModal";

export function GoodsTagsTableRowActions({ id }: { id: string }) {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Group gap="xs">
                <ActionIcon
                    component={Link}
                    href={`/admin/tags/${id}`}
                    variant="transparent"
                    color="dark"
                    size="xs"
                >
                    <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon
                    size="xs"
                    color="dark"
                    variant="transparent"
                    onClick={open}
                >
                    <IconTrash size={16} />
                </ActionIcon>
            </Group>
            <DeleteOneGoodsTagModal
                onSuccess={async () => {}}
                close={close}
                id={id}
                opened={opened}
            />
        </>
    );
}
