"use client";

import { ActionIcon, Group } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import { DeleteGoodsIdModal } from "~/components/admin/goods-ids/DeleteGoodsIdModal";

export function GoodsIdsTableRowActions({ id }: { id: string }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Group>
        <ActionIcon
          component={Link}
          href={`/admin/ids/${id}`}
          variant="transparent"
          color="orange"
        >
          <IconEdit />
        </ActionIcon>
        <ActionIcon color="red" variant="transparent" onClick={open}>
          <IconTrash />
        </ActionIcon>
      </Group>
      <DeleteGoodsIdModal close={close} id={id} opened={opened} />
    </>
  );
}
