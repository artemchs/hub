"use client";

import { Modal } from "@mantine/core";
import { api } from "~/trpc/react";
import { type UpdateOneCharacteristicValueInput } from "~/utils/validation/characteristics/values/updateOneCharacteristicValue";
import { SingleGoodsCharacteristicValueForm } from "./SingleGoodsCharacteristicValueForm";

export function CreateOneGoodsCharacteristicValueModal({
  opened,
  close,
  initialValues,
}: {
  opened: boolean;
  close: () => void;
  initialValues?: UpdateOneCharacteristicValueInput;
}) {
  const apiUtils = api.useUtils();

  const { mutate, isPending } =
    api.characteristics.values.createOne.useMutation({
      async onSuccess() {
        await apiUtils.characteristics.values.readManyInfinite.invalidate();
        close();
      },
    });

  return (
    <Modal opened={opened} onClose={close} title="Создать значение атрибута">
      <SingleGoodsCharacteristicValueForm
        initialValues={initialValues}
        mode="create"
        onSubmit={mutate}
        isPending={isPending}
        close={close}
      />
    </Modal>
  );
}
