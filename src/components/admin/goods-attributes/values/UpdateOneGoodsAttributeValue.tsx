"use client";

import { Modal } from "@mantine/core";
import { api } from "~/trpc/react";
import { type CreateOneAttributeValueInput } from "~/utils/validation/attributes/values/createOneAttributeValue";
import { type UpdateOneAttributeValueInput } from "~/utils/validation/attributes/values/updateOneAttributeValue";
import { SingleGoodsAttributeValueForm } from "./SingleGoodsAttributeValueForm";
import { FormProps } from "~/types/forms";
import { ModalProps } from "~/types/modals";

export function UpdateOneGoodsAttributeValue({
  id,
  close,
  onSuccess,
}: { id: string } & FormProps) {
  const apiUtils = api.useUtils();

  const { data, isFetching } = api.attributes.values.readOne.useQuery({ id });

  const { mutate, isPending } = api.attributes.values.updateOne.useMutation({
    async onSuccess() {
      await Promise.all([
        apiUtils.attributes.values.readManyInfinite.invalidate(),
        apiUtils.attributes.values.readOne.invalidate({ id }),
      ]);
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  const handleSubmit = (
    values: CreateOneAttributeValueInput | UpdateOneAttributeValueInput
  ) => {
    mutate({
      id,
      parentId: values.parentId,
      value: values.value,
    });
  };

  return (
    <SingleGoodsAttributeValueForm
      mode="update"
      initialValues={{
        id,
        parentId: data?.attributeId ?? "",
        value: data?.value ?? "",
      }}
      onSubmit={handleSubmit}
      isPending={isPending}
      isFetching={isFetching}
      close={close}
    />
  );
}

export function UpdateOneGoodsAttributeValueModal({
  id,
  close,
  opened,
  onSuccess,
}: { id: string } & ModalProps) {
  return (
    <Modal
      opened={opened ?? false}
      onClose={close}
      title="Изменить значение атрибута товара"
    >
      <UpdateOneGoodsAttributeValue
        id={id}
        close={close}
        onSuccess={onSuccess}
      />
    </Modal>
  );
}
