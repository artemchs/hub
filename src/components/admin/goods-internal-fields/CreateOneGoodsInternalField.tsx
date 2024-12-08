"use client";

import { Modal } from "@mantine/core";
import { api } from "~/trpc/react";
import { UpdateOneInternalFieldInput } from "~/utils/validation/internal-fields/updateOneInternalField";
import { SingleGoodsInternalFieldForm } from "./SingleGoodsInternalFieldForm";
import { ModalProps } from "~/types/modals";
import { FormProps } from "~/types/forms";

export function CreateOneGoodsInternalField({
  close,
  onSuccess,
  initialValues,
}: FormProps & { initialValues?: UpdateOneInternalFieldInput }) {
  const apiUtils = api.useUtils();

  const { mutate, isPending } = api.internalFields.createOne.useMutation({
    async onSuccess() {
      await Promise.all([
        apiUtils.internalFields.readMany.invalidate(),
        apiUtils.internalFields.readManyInfinite.invalidate(),
      ]);
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return (
    <SingleGoodsInternalFieldForm
      initialValues={initialValues}
      mode="create"
      onSubmit={mutate}
      isPending={isPending}
      close={close}
    />
  );
}

export function CreateOneGoodsInternalFieldModal({
  close,
  opened,
  onSuccess,
  initialValues,
}: ModalProps & { initialValues?: UpdateOneInternalFieldInput }) {
  return (
    <Modal opened={opened ?? false} onClose={close} title="Создать поле">
      <CreateOneGoodsInternalField
        close={close}
        onSuccess={onSuccess}
        initialValues={initialValues}
      />
    </Modal>
  );
}
