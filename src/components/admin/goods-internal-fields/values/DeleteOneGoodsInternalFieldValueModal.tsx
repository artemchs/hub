"use client";

import { Box, Button, Modal, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { api } from "~/trpc/react";

export function DeleteOneGoodsInternalFieldValueModal({
  id,
  opened,
  close,
}: {
  id: string;
  opened: boolean;
  close: () => void;
}) {
  const apiUtils = api.useUtils();

  const { mutate, isPending } = api.internalFields.values.deleteOne.useMutation(
    {
      async onSuccess() {
        await apiUtils.internalFields.values.readManyInfinite.invalidate();
      },
    }
  );

  return (
    <Modal opened={opened} onClose={close} title="Удалить значение поля">
      <Text>Вы уверены что хотите удалить это значение поля?</Text>
      <Box className="flex flex-col gap-2 lg:flex-row-reverse mt-8">
        <Button
          color="red"
          className="w-full lg:w-fit"
          onClick={() => {
            mutate({ id });
            close();
          }}
          leftSection={<IconTrash className="h-4 w-4" />}
          loading={isPending}
        >
          Удалить
        </Button>
        <Button variant="default" className="w-full lg:w-fit" onClick={close}>
          Отмена
        </Button>
      </Box>
    </Modal>
  );
}