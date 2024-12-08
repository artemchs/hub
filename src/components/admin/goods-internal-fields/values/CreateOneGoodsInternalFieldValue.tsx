"use client";

import { Modal } from "@mantine/core";
import { api } from "~/trpc/react";
import { UpdateOneInternalFieldValueInput } from "~/utils/validation/internal-fields/values/updateOneInternalFieldValue";
import { SingleGoodsInternalFieldValueForm } from "./SingleGoodsInternalFieldValueForm";
import { ModalProps } from "~/types/modals";
import { FormProps } from "~/types/forms";

export function CreateOneGoodsInternalFieldValue({
  close,
  onSuccess,
  initialValues,
}: FormProps & { initialValues?: UpdateOneInternalFieldValueInput }) {
  const apiUtils = api.useUtils();

  const { mutate, isPending } = api.internalFields.values.createOne.useMutation(
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
    <SingleGoodsInternalFieldValueForm
      initialValues={initialValues}
      mode="create"
      onSubmit={mutate}
      isPending={isPending}
      close={close}
    />
  );
}

export function CreateOneGoodsInternalFieldValueModal({
  close,
  opened,
  onSuccess,
  initialValues,
}: ModalProps & { initialValues?: UpdateOneInternalFieldValueInput }) {
  return (
    <Modal
      opened={opened ?? false}
      onClose={close}
      title="Создать значение поля"
    >
      <CreateOneGoodsInternalFieldValue
        close={close}
        onSuccess={onSuccess}
        initialValues={initialValues}
      />
    </Modal>
  );
}
