"use client";

import { api } from "~/trpc/react";
import { SingleGoodsTagForm } from "./SingleGoodsTagForm";
import { Modal } from "@mantine/core";
import { ModalProps } from "~/types/modals";
import { FormProps } from "~/types/forms";

export function CreateOneGoodsTag({ close, onSuccess }: FormProps) {
  const apiUtils = api.useUtils();

  const { mutate, isPending } = api.tags.createOne.useMutation({
    async onSuccess() {
      await apiUtils.tags.readMany.invalidate();
      await apiUtils.tags.readManyInfinite.invalidate();
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return (
    <SingleGoodsTagForm
      mode="create"
      onSubmit={mutate}
      isPending={isPending}
      close={close}
    />
  );
}

export function CreateOneGoodsTagModal({
  close,
  opened,
  onSuccess,
}: ModalProps) {
  return (
    <Modal
      opened={opened ?? false}
      onClose={close}
      title="Создать новый тег товара"
    >
      <CreateOneGoodsTag close={close} onSuccess={onSuccess} />
    </Modal>
  );
}
