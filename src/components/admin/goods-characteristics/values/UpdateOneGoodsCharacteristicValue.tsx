"use client";

import { Modal } from "@mantine/core";
import { api } from "~/trpc/react";
import { type CreateOneCharacteristicValueInput } from "~/utils/validation/characteristics/values/createOneCharacteristicValue";
import { type UpdateOneCharacteristicValueInput } from "~/utils/validation/characteristics/values/updateOneCharacteristicValue";
import { SingleGoodsCharacteristicValueForm } from "./SingleGoodsCharacteristicValueForm";
import { FormProps } from "~/types/forms";
import { ModalProps } from "~/types/modals";

export function UpdateOneGoodsCharacteristicValue({
  id,
  close,
  onSuccess,
}: { id: string } & FormProps) {
  const apiUtils = api.useUtils();

  const { data, isFetching } = api.characteristics.values.readOne.useQuery({
    id,
  });

  const { mutate, isPending } =
    api.characteristics.values.updateOne.useMutation({
      async onSuccess() {
        await Promise.all([
          apiUtils.characteristics.values.readManyInfinite.invalidate(),
          apiUtils.characteristics.values.readOne.invalidate({ id }),
        ]);
        if (onSuccess) {
          onSuccess();
        }
      },
    });

  const handleSubmit = (
    values:
      | CreateOneCharacteristicValueInput
      | UpdateOneCharacteristicValueInput
  ) => {
    mutate({
      id,
      parentId: values.parentId,
      value: values.value,
    });
  };

  return (
    <SingleGoodsCharacteristicValueForm
      mode="update"
      initialValues={{
        id,
        parentId: data?.characteristicId ?? "",
        value: data?.value ?? "",
      }}
      onSubmit={handleSubmit}
      isPending={isPending}
      isFetching={isFetching}
      close={close}
    />
  );
}

export function UpdateOneGoodsCharacteristicValueModal({
  id,
  close,
  opened,
  onSuccess,
}: { id: string } & ModalProps) {
  return (
    <Modal
      opened={opened ?? false}
      onClose={close}
      title="Изменить значение характеристики товара"
    >
      <UpdateOneGoodsCharacteristicValue
        id={id}
        close={close}
        onSuccess={onSuccess}
      />
    </Modal>
  );
}
