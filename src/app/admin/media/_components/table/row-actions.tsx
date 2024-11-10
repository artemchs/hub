"use client";

import { ActionIcon, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { DeleteOneGoodsMediaModal } from "~/components/admin/goods-media/DeleteOneGoodsMediaModal";

export function GoodsMediaTableRowActions({ id }: { id: string }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Group>
        <ActionIcon
          component={Link}
          href={`/admin/media/${id}`}
          variant="transparent"
          color="orange"
        >
          <IconEdit />
        </ActionIcon>
        <ActionIcon color="red" variant="transparent" onClick={open}>
          <IconTrash />
        </ActionIcon>
      </Group>
      <DeleteOneGoodsMediaModal close={close} id={id} opened={opened} />
    </>
  );
}
