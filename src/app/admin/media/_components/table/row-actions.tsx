"use client";

import { ActionIcon, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { DeleteOneGoodsMediaModal } from "~/components/admin/goods-media/DeleteOneGoodsMediaModal";

export function GoodsMediaTableRowActions({ id }: { id: string }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Group gap="xs">
        <ActionIcon
          component={Link}
          href={`/admin/media/${id}`}
          variant="transparent"
          color="dark"
          size="xs"
        >
          <IconPencil size={16} />
        </ActionIcon>
        <ActionIcon size="xs" color="dark" variant="transparent" onClick={open}>
          <IconTrash size={16} />
        </ActionIcon>
      </Group>
      <DeleteOneGoodsMediaModal close={close} id={id} opened={opened} />
    </>
  );
}
