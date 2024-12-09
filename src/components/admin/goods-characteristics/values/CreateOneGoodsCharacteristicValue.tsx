"use client";

import { Modal } from "@mantine/core";
import { api } from "~/trpc/react";
import { type UpdateOneCharacteristicValueInput } from "~/utils/validation/characteristics/values/updateOneCharacteristicValue";
import { SingleGoodsCharacteristicValueForm } from "./SingleGoodsCharacteristicValueForm";
import { FormProps } from "~/types/forms";
import { ModalProps } from "~/types/modals";

export function CreateOneGoodsCharacteristicValue({
  close,
  onSuccess,
}: FormProps) {
  const apiUtils = api.useUtils();

  const { mutate, isPending } =
    api.characteristics.values.createOne.useMutation({
      async onSuccess() {
        await Promise.all([
          apiUtils.characteristics.values.readManyInfinite.invalidate(),
        ]);
        if (onSuccess) {
          onSuccess();
        }
      },
    });

  return (
    <SingleGoodsCharacteristicValueForm
      mode="create"
      onSubmit={mutate}
      isPending={isPending}
      close={close}
    />
  );
}

export function CreateOneGoodsCharacteristicValueModal({
  close,
  opened,
  onSuccess,
}: ModalProps) {
  return (
    <Modal
      opened={opened ?? false}
      onClose={close}
      title="Создать новое значение характеристики товара"
    >
      <CreateOneGoodsCharacteristicValue close={close} onSuccess={onSuccess} />
    </Modal>
  );
}
