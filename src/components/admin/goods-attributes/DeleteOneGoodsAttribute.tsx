"use client";

import { Box, Button, Modal, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { api } from "~/trpc/react";
import { ModalProps } from "~/types/modals";

export function DeleteOneGoodsAttribute({
  id,
  close,
  opened,
  onSuccess,
}: { id: string } & ModalProps) {
  const apiUtils = api.useUtils();

  const { mutate, isPending } = api.attributes.deleteOne.useMutation({
    async onSuccess() {
      await Promise.all([
        apiUtils.attributes.readManyInfinite.invalidate(),
        apiUtils.attributes.readMany.invalidate(),
      ]);
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return (
    <>
      <Text>Вы уверены что хотите удалить этот атрибут?</Text>
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
    </>
  );
}

export function DeleteOneGoodsAttributeModal({
  id,
  close,
  opened,
  onSuccess,
}: { id: string } & ModalProps) {
  return (
    <Modal opened={opened ?? false} onClose={close} title="Удалить атрибут">
      <DeleteOneGoodsAttribute id={id} close={close} onSuccess={onSuccess} />
    </Modal>
  );
}
