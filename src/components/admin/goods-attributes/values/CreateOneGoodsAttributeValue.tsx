"use client";

import { Modal } from "@mantine/core";
import { api } from "~/trpc/react";
import { SingleGoodsAttributeValueForm } from "./SingleGoodsAttributeValueForm";
import { type UpdateOneAttributeValueInput } from "~/utils/validation/attributes/values/updateOneAttributeValue";
import { FormProps } from "~/types/forms";
import { ModalProps } from "~/types/modals";

export function CreateOneGoodsAttributeValue({ close, onSuccess }: FormProps) {
  const apiUtils = api.useUtils();

  const { mutate, isPending } = api.attributes.values.createOne.useMutation({
    async onSuccess() {
      await Promise.all([
        apiUtils.attributes.values.readManyInfinite.invalidate(),
      ]);
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return (
    <SingleGoodsAttributeValueForm
      mode="create"
      onSubmit={mutate}
      isPending={isPending}
      close={close}
    />
  );
}

export function CreateOneGoodsAttributeValueModal({
  close,
  opened,
  onSuccess,
}: ModalProps) {
  return (
    <Modal
      opened={opened ?? false}
      onClose={close}
      title="Создать новое значение атрибута товара"
    >
      <CreateOneGoodsAttributeValue close={close} onSuccess={onSuccess} />
    </Modal>
  );
}
