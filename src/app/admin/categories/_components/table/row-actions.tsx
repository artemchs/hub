"use client";

import { ActionIcon, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { DeleteGoodsCategoryModal } from "~/components/admin/goods-categories/DeleteGoodsCategoryModal";

export function GoodsCategoriesTableRowActions({ id }: { id: string }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Group>
        <ActionIcon
          component={Link}
          href={`/admin/categories/${id}`}
          variant="transparent"
          color="orange"
        >
          <IconEdit />
        </ActionIcon>
        <ActionIcon color="red" variant="transparent" onClick={open}>
          <IconTrash />
        </ActionIcon>
      </Group>
      <DeleteGoodsCategoryModal close={close} id={id} opened={opened} />
    </>
  );
}
