"use client";

import { ActionIcon, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { DeleteOneGoodsCharacteristicModal } from "~/components/admin/goods-characteristics/DeleteOneGoodsCharacteristicModal";

export function GoodsCharacteristicsTableRowActions({ id }: { id: string }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Group gap="xs">
        <ActionIcon
          component={Link}
          href={`/admin/characteristics/${id}`}
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
      <DeleteOneGoodsCharacteristicModal
        close={close}
        id={id}
        opened={opened}
      />
    </>
  );
}
