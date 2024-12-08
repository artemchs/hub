// UpdateOneGoodsInternalFieldValue.tsx
"use client";

import { Modal } from "@mantine/core";
import { api } from "~/trpc/react";
import { SingleGoodsInternalFieldValueForm } from "./SingleGoodsInternalFieldValueForm";
import { UpdateOneInternalFieldValueInput } from "~/utils/validation/internal-fields/values/updateOneInternalFieldValue";
import { FormProps } from "~/types/forms";
import { ModalProps } from "~/types/modals";

export function UpdateOneGoodsInternalFieldValue({
  close,
  onSuccess,
  id,
}: FormProps & { id: string }) {
  const apiUtils = api.useUtils();

  const { data, isFetching } = api.internalFields.values.readOne.useQuery({
    id,
  });

  const { mutate, isPending } = api.internalFields.values.updateOne.useMutation(
    {
      async onSuccess() {
        await Promise.all([
          apiUtils.internalFields.values.readManyInfinite.invalidate(),
          apiUtils.internalFields.values.readOne.invalidate({ id }),
        ]);
        if (onSuccess) {
          onSuccess();
        }
      },
    }
  );

  const handleSubmit = (values: UpdateOneInternalFieldValueInput) => {
    mutate({
      id,
      parentId: values.parentId,
      value: values.value,
    });
  };

  return (
    <SingleGoodsInternalFieldValueForm
      mode="update"
      initialValues={{
        id,
        parentId: data?.fieldId ?? "",
        value: data?.value ?? "",
      }}
      onSubmit={handleSubmit}
      isPending={isPending}
      isFetching={isFetching}
      close={close}
    />
  );
}

export function UpdateOneGoodsInternalFieldValueModal({
  close,
  opened,
  onSuccess,
  id,
}: ModalProps & { id: string }) {
  return (
    <Modal
      opened={opened ?? false}
      onClose={close}
      title="Изменить значение поля"
    >
      <UpdateOneGoodsInternalFieldValue
        close={close}
        onSuccess={onSuccess}
        id={id}
      />
    </Modal>
  );
}
