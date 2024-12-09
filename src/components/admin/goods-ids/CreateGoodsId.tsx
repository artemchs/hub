"use client";

import { api } from "~/trpc/react";
import { GoodsIdForm } from "./GoodsIdForm";
import { useRouter } from "next/navigation";
import { FormProps } from "~/types/forms";
import { ModalProps } from "~/types/modals";
import { Modal } from "@mantine/core";

export function CreateGoodsId({ close, onSuccess }: FormProps) {
  const apiUtils = api.useUtils();

  const { mutate, isPending } = api.ids.createOne.useMutation({
    async onSuccess() {
      await Promise.all([
        apiUtils.ids.readManyInfinite.invalidate(),
        apiUtils.ids.readMany.invalidate(),
      ]);
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return (
    <GoodsIdForm
      mode="create"
      onSubmit={mutate}
      isPending={isPending}
      close={close}
    />
  );
}

export function CreateGoodsIdModal({ close, opened, onSuccess }: ModalProps) {
  return (
    <Modal
      opened={opened ?? false}
      onClose={close}
      title="Создать новый идентификатор товара"
    >
      <CreateGoodsId close={close} onSuccess={onSuccess} />
    </Modal>
  );
}
