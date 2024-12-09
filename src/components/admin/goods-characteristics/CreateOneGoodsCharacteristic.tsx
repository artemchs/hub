"use client";

import { api } from "~/trpc/react";
import { SingleGoodsCharacteristicForm } from "./SingleGoodsCharacteristicForm";
import { FormProps } from "~/types/forms";
import { ModalProps } from "~/types/modals";
import { Modal } from "@mantine/core";

export function CreateOneGoodsCharacteristic({ close, onSuccess }: FormProps) {
  const apiUtils = api.useUtils();

  const { mutate, isPending } = api.characteristics.createOne.useMutation({
    async onSuccess() {
      await Promise.all([
        apiUtils.characteristics.readManyInfinite.invalidate(),
        apiUtils.characteristics.readMany.invalidate(),
      ]);
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return (
    <SingleGoodsCharacteristicForm
      mode="create"
      onSubmit={mutate}
      isPending={isPending}
      close={close}
    />
  );
}

export function CreateOneGoodsCharacteristicModal({
  close,
  opened,
  onSuccess,
}: ModalProps) {
  return (
    <Modal
      opened={opened ?? false}
      onClose={close}
      title="Создать новую характеристику товара"
    >
      <CreateOneGoodsCharacteristic close={close} onSuccess={onSuccess} />
    </Modal>
  );
}
