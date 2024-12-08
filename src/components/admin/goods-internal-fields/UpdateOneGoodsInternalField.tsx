"use client";

import { Modal } from "@mantine/core";
import { api } from "~/trpc/react";
import { SingleGoodsInternalFieldForm } from "./SingleGoodsInternalFieldForm";
import { FormProps } from "~/types/forms";
import { ModalProps } from "~/types/modals";
import { UpdateOneInternalFieldInput } from "~/utils/validation/internal-fields/updateOneInternalField";

export function UpdateOneGoodsInternalField({
  close,
  onSuccess,
  id,
}: FormProps & { id: string }) {
  const apiUtils = api.useUtils();

  const { data, isFetching } = api.internalFields.readOne.useQuery({
    id,
  });

  const { mutate, isPending } = api.internalFields.updateOne.useMutation({
    async onSuccess() {
      await Promise.all([
        apiUtils.internalFields.readMany.invalidate(),
        apiUtils.internalFields.readManyInfinite.invalidate(),
        apiUtils.internalFields.readOne.invalidate({ id }),
      ]);
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  const handleSubmit = (values: UpdateOneInternalFieldInput) => {
    mutate({
      id,
      name: values.name,
    });
  };

  return (
    <SingleGoodsInternalFieldForm
      mode="update"
      initialValues={{
        id,
        name: data?.name ?? "",
      }}
      onSubmit={handleSubmit}
      isPending={isPending}
      isFetching={isFetching}
      close={close}
    />
  );
}

export function UpdateOneGoodsInternalFieldModal({
  close,
  opened,
  onSuccess,
  id,
}: ModalProps & { id: string }) {
  return (
    <Modal opened={opened ?? false} onClose={close} title="Изменить поле">
      <UpdateOneGoodsInternalField
        close={close}
        onSuccess={onSuccess}
        id={id}
      />
    </Modal>
  );
}
