"use client";

import { Box, Button, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { Modal } from "@mantine/core";
import { api } from "~/trpc/react";
import { FormProps } from "~/types/forms";
import { ModalProps } from "~/types/modals";

export function DeleteOneGoodsInternalFieldValue({
  close,
  onSuccess,
  id,
}: FormProps & { id: string }) {
  const apiUtils = api.useUtils();

  const { mutate, isPending } = api.internalFields.values.deleteOne.useMutation(
    {
      async onSuccess() {
        await apiUtils.internalFields.values.readManyInfinite.invalidate();
        if (onSuccess) {
          onSuccess();
        }
      },
    }
  );

  return (
    <>
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
    </>
  );
}

export function DeleteOneGoodsInternalFieldValueModal({
  close,
  opened,
  onSuccess,
  id,
}: ModalProps & { id: string }) {
  return (
    <Modal
      opened={opened ?? false}
      onClose={close}
      title="Удалить значение поля"
    >
      <DeleteOneGoodsInternalFieldValue
        close={close}
        onSuccess={onSuccess}
        id={id}
      />
    </Modal>
  );
}
