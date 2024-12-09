"use client";

import { api } from "~/trpc/react";
import { SingleGoodsAttributeForm } from "./SingleGoodsAttributeForm";
import { FormProps } from "~/types/forms";
import { Modal } from "@mantine/core";
import { ModalProps } from "~/types/modals";

export function CreateOneGoodsAttribute({ close, onSuccess }: FormProps) {
  const apiUtils = api.useUtils();

  const { mutate, isPending } = api.attributes.createOne.useMutation({
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
    <SingleGoodsAttributeForm
      mode="create"
      onSubmit={mutate}
      isPending={isPending}
      close={close}
    />
  );
}

export function CreateOneGoodsAttributeModal({
  close,
  opened,
  onSuccess,
}: ModalProps) {
  return (
    <Modal
      opened={opened ?? false}
      onClose={close}
      title="Создать новый атрибут товара"
    >
      <CreateOneGoodsAttribute close={close} onSuccess={onSuccess} />
    </Modal>
  );
}
