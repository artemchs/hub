"use client";

import { ActionIcon, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { DeleteOneGoodsCharacteristicModal } from "~/components/admin/goods-characteristics/DeleteOneGoodsCharacteristicModal";

export function GoodsCharacteristicsTableRowActions({ id }: { id: string }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Group>
        <ActionIcon
          component={Link}
          href={`/admin/characteristics/${id}`}
          variant="transparent"
          color="orange"
        >
          <IconEdit />
        </ActionIcon>
        <ActionIcon color="red" variant="transparent" onClick={open}>
          <IconTrash />
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
