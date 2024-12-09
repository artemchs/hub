"use client";

import { ActionIcon, Group } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import { DeleteGoodsIdModal } from "~/components/admin/goods-ids/DeleteGoodsId";

export function GoodsIdsTableRowActions({ id }: { id: string }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Group gap="xs">
        <ActionIcon
          component={Link}
          href={`/admin/ids/${id}`}
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
      <DeleteGoodsIdModal
        close={close}
        id={id}
        opened={opened}
        onSuccess={async () => {}}
      />
    </>
  );
}
