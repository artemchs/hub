"use client";

import { ActionIcon, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { DeleteOneGoodModal } from "~/components/admin/goods/DeleteOneGoodModal";

export function GoodsTableRowActions({ id }: { id: string }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Group>
        <ActionIcon
          component={Link}
          href={`/admin/goods/${id}`}
          variant="transparent"
          color="orange"
        >
          <IconEdit />
        </ActionIcon>
        <ActionIcon color="red" variant="transparent" onClick={open}>
          <IconTrash />
        </ActionIcon>
      </Group>
      <DeleteOneGoodModal close={close} id={id} opened={opened} />
    </>
  );
}
