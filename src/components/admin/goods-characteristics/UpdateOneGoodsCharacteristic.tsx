"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { type CreateOneCharacteristicInput } from "~/utils/validation/characteristics/createOneCharacteristic";
import { type UpdateOneCharacteristicInput } from "~/utils/validation/characteristics/updateOneCharacteristic";
import { SingleGoodsCharacteristicForm } from "./SingleGoodsCharacteristicForm";
import { FormProps } from "~/types/forms";
import { Modal } from "@mantine/core";
import { ModalProps } from "~/types/modals";

export function UpdateOneGoodsCharacteristic({
  id,
  close,
  onSuccess,
}: { id: string } & FormProps) {
  const apiUtils = api.useUtils();

  const { data, isFetching } = api.characteristics.readOne.useQuery({ id });

  const { mutate, isPending } = api.characteristics.updateOne.useMutation({
    async onSuccess() {
      await Promise.all([
        apiUtils.characteristics.readMany.invalidate(),
        apiUtils.characteristics.readManyInfinite.invalidate(),
        apiUtils.characteristics.readOne.invalidate({ id }),
      ]);
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  const handleSubmit = (
    values: CreateOneCharacteristicInput | UpdateOneCharacteristicInput
  ) => {
    mutate({
      id,
      name: values.name,
    });
  };

  return (
    <SingleGoodsCharacteristicForm
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

export function UpdateOneGoodsCharacteristicModal({
  id,
  close,
  opened,
  onSuccess,
}: { id: string } & ModalProps) {
  return (
    <Modal
      opened={opened ?? false}
      onClose={close}
      title="Изменить характеристику товара"
    >
      <UpdateOneGoodsCharacteristic
        id={id}
        close={close}
        onSuccess={onSuccess}
      />
    </Modal>
  );
}
