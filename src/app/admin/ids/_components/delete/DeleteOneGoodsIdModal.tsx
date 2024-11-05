"use client";

import { Box, Button, Modal, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { api } from "~/trpc/react";

export function DeleteOneGoodsIdModal({
  id,
  close,
  opened,
}: {
  id: string;
  opened: boolean;
  close: () => void;
}) {
  const apiUtils = api.useUtils();
  const { mutate, isPending } = api.ids.deleteOne.useMutation({
    async onSuccess() {
      close();
      await apiUtils.ids.readMany.invalidate();
    },
  });

  return (
    <Modal opened={opened} onClose={close} title="Удалить идентификатор">
      <Text>Вы уверены что хотите удалить этот идентификатор?</Text>
      <Box className="flex flex-col gap-2 lg:flex-row-reverse mt-8">
        <Button
          color="red"
          className="w-full lg:w-fit"
          onClick={() => mutate({ id })}
          leftSection={<IconTrash className="h-4 w-4" />}
          loading={isPending}
        >
          Удалить
        </Button>
        <Box mr={2}>
          <Button variant="default" className="w-full lg:w-fit" onClick={close}>
            Отмена
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
